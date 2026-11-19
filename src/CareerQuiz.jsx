import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TYPE_ORDER, questions, riasec, typePalette } from './content';

const emptyScores = () => TYPE_ORDER.reduce((acc, type) => ({ ...acc, [type]: 0 }), {});

const compactResultCopy = {
  ru: {
    file: 'В PDF — подробный профиль, профессии, задания для проверки себя, страны, университеты и все твои ответы.',
    download: 'Скачать результаты PDF',
    saving: 'Сохраняем результат…',
    saved: 'Результат передан консультанту.',
    saveError: 'Результат не сохранился. Попробуй ещё раз.',
    pdfError: 'Не удалось скачать PDF. Попробуй ещё раз.',
    retry: 'Повторить',
    preparing: 'Готовим PDF…',
  },
  ky: {
    file: 'PDF ичинде толук профилиң, кесиптер, өзүңдү сынай турган тапшырмалар, өлкөлөр, университеттер жана бардык жоопторуң бар.',
    download: 'Жыйынтыкты PDF жүктөө',
    saving: 'Жыйынтык сакталууда…',
    saved: 'Жыйынтык кеңешчиге жөнөтүлдү.',
    saveError: 'Жыйынтык сакталган жок. Кайра аракет кыл.',
    pdfError: 'PDF жүктөлгөн жок. Кайра аракет кыл.',
    retry: 'Кайталоо',
    preparing: 'PDF даярдалууда…',
  },
  en: {
    file: 'The PDF has your full profile, careers, practical trials, countries, universities and every answer you gave.',
    download: 'Download results PDF',
    saving: 'Saving your result…',
    saved: 'Your result was sent to an adviser.',
    saveError: 'The result could not be saved. Try again.',
    pdfError: 'Could not download the PDF. Try again.',
    retry: 'Retry',
    preparing: 'Preparing PDF…',
  },
};

function ArrowIcon({ direction = 'right' }) {
  const rotation = direction === 'left' ? 'rotate(180 12 12)' : undefined;
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M14 7l5 5-5 5" transform={rotation} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CareerQuiz({ lang, copy, submission, onComplete }) {
  const [screen, setScreen] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showError, setShowError] = useState(false);
  const [saveState, setSaveState] = useState('idle');
  const [downloadState, setDownloadState] = useState('idle');
  const quizRef = useRef(null);
  const t = copy.quiz;
  const resultCopy = compactResultCopy[lang] || compactResultCopy.ru;
  const profiles = riasec[lang];

  const scores = useMemo(() => {
    const result = emptyScores();
    Object.entries(answers).forEach(([questionIndex, type]) => {
      const selected = questions[Number(questionIndex)]?.options[type];
      if (!selected) return;
      Object.entries(selected.scores).forEach(([scoreType, value]) => {
        result[scoreType] += value;
      });
    });
    return result;
  }, [answers]);

  const ranking = useMemo(
    () => TYPE_ORDER.map((type) => ({ type, score: scores[type] })).sort((a, b) => b.score - a.score || TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type)),
    [scores],
  );

  const scrollToQuiz = (block = 'center') => {
    requestAnimationFrame(() => {
      if (!quizRef.current) return;
      if (block === 'start') {
        window.scrollTo({ top: window.scrollY + quizRef.current.getBoundingClientRect().top, behavior: 'smooth' });
      } else {
        quizRef.current.scrollIntoView({ behavior: 'smooth', block });
      }
    });
  };

  const start = () => {
    setScreen('questions');
    setCurrent(0);
    setShowError(false);
    scrollToQuiz();
  };

  const selectAnswer = (type) => {
    setAnswers((previous) => ({ ...previous, [current]: type }));
    setShowError(false);
  };

  const goNext = () => {
    if (!answers[current]) {
      setShowError(true);
      return;
    }
    if (current === questions.length - 1) {
      setScreen('result');
      setSaveState('saving');
      Promise.resolve(onComplete?.(scores))
        .then(() => setSaveState('saved'))
        .catch(() => setSaveState('error'));
      scrollToQuiz('start');
      return;
    }
    setCurrent((value) => value + 1);
    setShowError(false);
    scrollToQuiz();
  };

  const goBack = () => {
    if (current === 0) {
      setScreen('intro');
      return;
    }
    setCurrent((value) => value - 1);
    setShowError(false);
  };

  const restart = () => {
    setAnswers({});
    setCurrent(0);
    setScreen('questions');
    setShowError(false);
    scrollToQuiz();
  };

  const downloadCertificate = async () => {
    setDownloadState('generating');
    try {
      const { downloadCertificatePdf } = await import('./certificatePdf');
      await downloadCertificatePdf({ submission, scores, answers, lang });
      setDownloadState('idle');
    } catch (error) {
      console.error('Certificate download failed', error);
      setDownloadState('error');
    }
  };

  const topThree = ranking.slice(0, 3);
  const hollandCode = topThree.map(({ type }) => type).join('');
  const isMixed = topThree[0]?.score - topThree[1]?.score <= 2;
  return (
    <section id="quiz" className={`quiz-section chapter chapter--blue${screen === 'result' ? ' quiz-section--result' : ''}`} ref={quizRef} aria-labelledby="quiz-title" data-ui>
      <div className="shell">
        {screen !== 'result' && <div className="quiz-heading">
          <h2 id="quiz-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>}

        <div className={`quiz-shell quiz-shell--${screen}`}>
          <AnimatePresence mode="wait">
            {screen === 'intro' && (
              <motion.div key="quiz-intro" className="quiz-intro" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="quiz-orbit" aria-hidden="true">
                  {TYPE_ORDER.map((type, index) => (
                    <span key={type} className={`orbit-letter orbit-letter--${index}`} style={{ '--type-color': typePalette[type] }}>{type}</span>
                  ))}
                  <div className="orbit-core"><strong>15</strong><span>{lang === 'ky' ? 'суроо' : lang === 'ru' ? 'вопросов' : 'questions'}</span></div>
                </div>
                <div className="quiz-intro-copy">
                  <p className="quiz-meta">RIASEC / Holland Code</p>
                  <h3>{lang === 'ky' ? 'Кызыгууңдун картасын түз' : lang === 'ru' ? 'Собери карту своих интересов' : 'Build your interest map'}</h3>
                  <p>{t.duration}</p>
                  <button type="button" className="button button--ink" onClick={start}>
                    {t.start}<ArrowIcon />
                  </button>
                  <span className="privacy-note"><span aria-hidden="true">●</span>{t.privacy}</span>
                </div>
              </motion.div>
            )}

            {screen === 'questions' && (
              <motion.div key={`question-${current}`} className="question-view" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.24 }}>
                <div className="question-topline">
                  <span>{t.question} <strong>{current + 1}</strong> {t.of} {questions.length}</span>
                  <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="progress-track" aria-hidden="true">
                  <motion.div className="progress-value" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} transition={{ duration: 0.35 }} />
                </div>
                <div className="question-layout">
                  <div className="question-number" aria-hidden="true">{current + 1}</div>
                  <div>
                    <h3>{questions[current].prompt[lang]}</h3>
                    <div className="answer-grid" role="radiogroup" aria-label={questions[current].prompt[lang]}>
                      {questions[current].order.map((type, index) => {
                        const item = questions[current].options[type];
                        const selected = answers[current] === type;
                        return (
                          <button
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            className={`answer-option${selected ? ' is-selected' : ''}`}
                            style={{ '--type-color': typePalette[type] }}
                            key={type}
                            onClick={() => selectAnswer(type)}
                          >
                            <span className="answer-key">{String.fromCharCode(65 + index)}</span>
                            <span>{item.text[lang]}</span>
                            <span className="answer-check" aria-hidden="true">{selected ? <span className="check-mark" /> : ''}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className={`quiz-error${showError ? ' is-visible' : ''}`} role="alert">{t.choose}</p>
                    <div className="quiz-controls">
                      <button type="button" className="text-button" onClick={goBack}><ArrowIcon direction="left" />{t.back}</button>
                      <button type="button" className="button button--ink" onClick={goNext}>
                        {current === questions.length - 1 ? t.finish : t.next}<ArrowIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'result' && (
              <div key="quiz-result" className="result-compact">
                <div className="result-compact-main">
                  <div className="result-compact-profile">
                    <p className="result-compact-eyebrow" id="quiz-title">{t.resultEyebrow} <span>15 / 15</span></p>
                    <h3 className="result-compact-code" aria-label={`${t.resultTitle}: ${hollandCode}`}>{hollandCode}</h3>
                    <p className="result-compact-lead">{profiles[topThree[0].type].name} · {profiles[topThree[0].type].oneLine}</p>
                    <p className="result-compact-explanation">{isMixed ? t.mixed : t.clear}</p>
                  </div>
                  <div className="result-compact-types">
                    <h4>{t.topTitle}</h4>
                    <ol>
                      {topThree.map(({ type }, index) => (
                        <li key={type}>
                          <span className="result-compact-rank">{String(index + 1).padStart(2, '0')}</span>
                          <span className="result-compact-letter" style={{ background: typePalette[type] }}>{type}</span>
                          <span>{profiles[type].name}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="result-compact-footer">
                  <div className="result-compact-file">
                    <p>{resultCopy.file}</p>
                    {saveState === 'saving' && <small role="status">{resultCopy.saving}</small>}
                    {saveState === 'saved' && <small role="status">{resultCopy.saved}</small>}
                    {saveState === 'error' && <small className="result-compact-error" role="alert">{resultCopy.saveError} <button type="button" onClick={() => { setSaveState('saving'); Promise.resolve(onComplete?.(scores)).then(() => setSaveState('saved')).catch(() => setSaveState('error')); }}>{resultCopy.retry}</button></small>}
                    {downloadState === 'error' && <small className="result-compact-error" role="alert">{resultCopy.pdfError}</small>}
                  </div>
                  <button type="button" className="button button--blue" onClick={downloadCertificate} disabled={downloadState === 'generating'}>{downloadState === 'generating' ? resultCopy.preparing : resultCopy.download}<ArrowIcon /></button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
