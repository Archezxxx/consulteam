import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TYPE_ORDER, questions, riasec, typePalette } from './content';

const emptyScores = () => TYPE_ORDER.reduce((acc, type) => ({ ...acc, [type]: 0 }), {});

function ArrowIcon({ direction = 'right' }) {
  const rotation = direction === 'left' ? 'rotate(180 12 12)' : undefined;
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M14 7l5 5-5 5" transform={rotation} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CareerQuiz({ lang, copy }) {
  const [screen, setScreen] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showError, setShowError] = useState(false);
  const quizRef = useRef(null);
  const t = copy.quiz;
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

  const scrollToQuiz = () => {
    requestAnimationFrame(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
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
      scrollToQuiz();
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

  const total = Object.values(scores).reduce((sum, value) => sum + value, 0) || 1;
  const topThree = ranking.slice(0, 3);
  const hollandCode = topThree.map(({ type }) => type).join('');
  const isMixed = topThree[0]?.score - topThree[1]?.score <= 2;
  const whatsappText = `${t.whatsappIntro}\n${t.resultTitle}: ${hollandCode}\n${topThree.map(({ type, score }) => `${type} — ${profiles[type].name}: ${score}`).join('\n')}\n\n${lang === 'ky' ? 'Жыйынтыкты жана окуу багыттарын кеңешчи менен талкуулагым келет.' : lang === 'ru' ? 'Хочу обсудить результат и подходящие направления с консультантом.' : 'I would like to discuss my result and suitable study directions with an adviser.'}`;
  const whatsappHref = `https://wa.me/996709694959?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section id="quiz" className="quiz-section section" ref={quizRef} aria-labelledby="quiz-title">
      <div className="shell">
        <div className="quiz-heading">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="quiz-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>

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
                  <p className="quiz-kicker">RIASEC · Holland Code</p>
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
                  <div className="question-number" aria-hidden="true">{String(current + 1).padStart(2, '0')}</div>
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
                            <span className="answer-check" aria-hidden="true">{selected ? '✓' : ''}</span>
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
              <motion.div key="quiz-result" className="result-view" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
                <div className="result-hero">
                  <div>
                    <p className="eyebrow eyebrow--light">{t.resultEyebrow}</p>
                    <p className="result-label">{t.resultTitle}</p>
                    <h3 className="holland-code" aria-label={`${t.resultTitle}: ${hollandCode}`}>{hollandCode}</h3>
                    <p className="result-explanation">{isMixed ? t.mixed : t.clear}</p>
                  </div>
                  <div className="code-stack" aria-hidden="true">
                    {topThree.map(({ type }, index) => (
                      <div key={type} style={{ '--type-color': typePalette[type], '--stack-index': index }}><strong>{type}</strong><span>{profiles[type].name}</span></div>
                    ))}
                  </div>
                </div>

                <div className="result-body">
                  <section className="score-section" aria-labelledby="score-heading">
                    <div className="result-section-heading">
                      <p className="mini-index">01</p>
                      <h4 id="score-heading">{t.chartTitle}</h4>
                    </div>
                    <div className="score-list">
                      {ranking.map(({ type, score }) => {
                        const percent = Math.round((score / total) * 100);
                        return (
                          <div className="score-row" key={type}>
                            <div className="score-name"><span style={{ background: typePalette[type] }}>{type}</span><strong>{profiles[type].name}</strong></div>
                            <div className="score-bar"><motion.span initial={{ width: 0 }} animate={{ width: `${Math.max(percent, 3)}%` }} transition={{ duration: 0.65 }} style={{ background: typePalette[type] }} /></div>
                            <span className="score-percent">{percent}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section className="top-types" aria-labelledby="top-heading">
                    <div className="result-section-heading">
                      <p className="mini-index">02</p>
                      <h4 id="top-heading">{t.topTitle}</h4>
                    </div>
                    <div className="top-type-grid">
                      {topThree.map(({ type }, index) => (
                        <article className="top-type" key={type} style={{ '--type-color': typePalette[type] }}>
                          <div className="top-type-head"><span>{index + 1}</span><strong>{type}</strong></div>
                          <h5>{profiles[type].name}</h5>
                          <p className="type-one-line">{profiles[type].oneLine}</p>
                          <p>{profiles[type].summary}</p>
                          <ul>{profiles[type].strengths.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="detail-section" aria-labelledby="detail-heading">
                    <div className="result-section-heading">
                      <p className="mini-index">03</p>
                      <h4 id="detail-heading">{profiles[topThree[0].type].name}: {profiles[topThree[0].type].oneLine}</h4>
                    </div>
                    <div className="detail-grid">
                      <article className="detail-block detail-block--wide">
                        <h5>{t.strengths}</h5>
                        <div className="tag-list">{profiles[topThree[0].type].strengths.map((item) => <span key={item}>{item}</span>)}</div>
                      </article>
                      <article className="detail-block">
                        <h5>{t.environments}</h5>
                        <ul>{profiles[topThree[0].type].environments.map((item) => <li key={item}>{item}</li>)}</ul>
                      </article>
                      <article className="detail-block">
                        <h5>{t.careers}</h5>
                        <ul className="career-list">{profiles[topThree[0].type].careers.map((item) => <li key={item}>{item}</li>)}</ul>
                      </article>
                      <article className="detail-block detail-block--wide detail-block--muted">
                        <h5>{t.watch}</h5>
                        <p>{profiles[topThree[0].type].watch}</p>
                      </article>
                      <article className="detail-block">
                        <h5>{t.school}</h5>
                        <ul>{profiles[topThree[0].type].school.map((item) => <li key={item}>{item}</li>)}</ul>
                      </article>
                      <article className="detail-block detail-block--accent">
                        <h5>{t.nextSteps}</h5>
                        <ol>{profiles[topThree[0].type].steps.map((item) => <li key={item}>{item}</li>)}</ol>
                      </article>
                    </div>
                  </section>

                  <p className="quiz-disclaimer">{t.disclaimer}</p>
                  <div className="result-actions">
                    <button type="button" className="text-button" onClick={restart}>{t.retake}</button>
                    <button type="button" className="button button--outline" onClick={() => window.print()}>{t.print}</button>
                    <a className="button button--blue" href={whatsappHref} target="_blank" rel="noreferrer">{t.consult}<ArrowIcon /></a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
