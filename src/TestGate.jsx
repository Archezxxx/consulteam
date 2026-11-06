import { useState } from 'react';

const API = import.meta.env.VITE_PROFFTEST_API_URL || 'https://crm.consulteam.edu.kg/api/public/proff-tests';

const labels = {
  ru: {
    title: 'Расскажи о себе',
    lead: 'Перед тестом оставь контакты. Консультант сможет обсудить результат и подобрать учебный маршрут.',
    name: 'ФИО ученика',
    phone: 'Номер телефона',
    email: 'Email (необязательно)',
    school: 'Школа (необязательно)',
    grade: 'Класс (необязательно)',
    consent: 'Согласен(на) на обработку этих данных и звонок консультанта по результату теста.',
    start: 'Продолжить к тесту',
    saving: 'Сохраняем анкету…',
    error: 'Не удалось сохранить анкету. Проверь соединение и попробуй ещё раз.',
  },
  ky: {
    title: 'Өзүң жөнүндө айтып бер',
    lead: 'Тестке чейин байланыш маалыматыңды калтыр. Кеңешчи жыйынтыкты талкуулап, окуу багытын тандоого жардам берет.',
    name: 'Окуучунун аты-жөнү',
    phone: 'Телефон номери',
    email: 'Email (милдеттүү эмес)',
    school: 'Мектеп (милдеттүү эмес)',
    grade: 'Класс (милдеттүү эмес)',
    consent: 'Бул маалыматтарды иштетүүгө жана тесттин жыйынтыгы боюнча кеңешчинин чалуусуна макулмун.',
    start: 'Тестке өтүү',
    saving: 'Маалымат сакталууда…',
    error: 'Маалымат сакталган жок. Байланышты текшерип, кайра аракет кыл.',
  },
  en: {
    title: 'Tell us about yourself',
    lead: 'Leave your contact details before the test. An adviser can discuss your result and study options with you.',
    name: 'Student full name',
    phone: 'Phone number',
    email: 'Email (optional)',
    school: 'School (optional)',
    grade: 'Grade (optional)',
    consent: 'I agree to the processing of these details and a follow-up call about my test result.',
    start: 'Continue to the test',
    saving: 'Saving your details…',
    error: 'Could not save your details. Check your connection and try again.',
  },
};

export default function TestGate({ lang, onRegistered }) {
  const t = labels[lang];
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.full_name,
          phone: data.phone,
          email: data.email || null,
          school: data.school || null,
          grade: data.grade || null,
          language: lang,
          consent: data.consent === 'on',
          website: data.website || '',
        }),
      });
      if (!response.ok) throw new Error('intake failed');
      onRegistered(await response.json());
    } catch {
      setError(t.error);
    } finally {
      setSaving(false);
    }
  }

  return <section className="test-gate chapter" aria-labelledby="gate-title">
    <div className="test-gate-copy">
      <h1 id="gate-title">{t.title}</h1>
      <p>{t.lead}</p>
      <div className="test-gate-mark" aria-hidden="true"><strong>15</strong><span>RIASEC</span></div>
    </div>
    <form className="test-gate-form" onSubmit={submit}>
      <label>{t.name}<input name="full_name" autoComplete="name" required minLength={3} maxLength={255} /></label>
      <label>{t.phone}<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={7} maxLength={32} placeholder="+996 700 000 000" /></label>
      <div className="test-gate-pair">
        <label>{t.email}<input name="email" type="email" autoComplete="email" maxLength={255} /></label>
        <label>{t.grade}<input name="grade" maxLength={32} /></label>
      </div>
      <label>{t.school}<input name="school" autoComplete="organization" maxLength={255} /></label>
      <label className="test-gate-consent"><input type="checkbox" name="consent" required /><span>{t.consent}</span></label>
      <label className="test-gate-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {error && <p className="test-gate-error" role="alert">{error}</p>}
      <button className="button button--black" disabled={saving}>{saving ? t.saving : t.start} <span aria-hidden="true">→</span></button>
    </form>
  </section>;
}

export async function saveProffTestResult(submission, scores) {
  const response = await fetch(`${API}/${submission.id}/result`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Submission-Token': submission.result_token },
    body: JSON.stringify({ scores }),
  });
  if (!response.ok) throw new Error('result failed');
  return response.json();
}
