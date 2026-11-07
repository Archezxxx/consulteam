import { useMemo, useRef, useState } from 'react';
import { AsYouType, getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/max';
import { PROFFTEST_API } from './proffTestApi';

const labels = {
  ru: {
    title: 'Расскажи о себе',
    lead: 'Перед тестом оставь контакты. Консультант сможет обсудить результат и подобрать учебный маршрут.',
    name: 'ФИО ученика',
    phone: 'Номер телефона',
    phoneCountry: 'Страна и телефонный код',
    phoneHint: 'Номер без кода страны. Код добавим автоматически.',
    phonePlaceholder: 'Номер телефона',
    phoneInvalid: 'Проверь номер: для выбранной страны он должен иметь действующий формат и код оператора.',
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
    phoneCountry: 'Өлкө жана телефон коду',
    phoneHint: 'Өлкө кодусуз номерди жаз. Код автоматтык түрдө кошулат.',
    phonePlaceholder: 'Телефон номери',
    phoneInvalid: 'Номерди текшер: тандалган өлкө үчүн туура формат жана оператор коду керек.',
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
    phoneCountry: 'Country and calling code',
    phoneHint: 'Enter the number without a country code. We add it automatically.',
    phonePlaceholder: 'Phone number',
    phoneInvalid: 'Check the number: its length and prefix must be valid for the selected country.',
    email: 'Email (optional)',
    school: 'School (optional)',
    grade: 'Grade (optional)',
    consent: 'I agree to the processing of these details and a follow-up call about my test result.',
    start: 'Continue to the test',
    saving: 'Saving your details…',
    error: 'Could not save your details. Check your connection and try again.',
  },
};

const countryCodes = getCountries();
const countryNames = { KG: { ru: 'Кыргызстан', ky: 'Кыргызстан', en: 'Kyrgyzstan' } };

function phoneOptions(lang) {
  const displayNames = new Intl.DisplayNames([lang === 'ky' ? 'ky-KG' : lang], { type: 'region' });
  const collator = new Intl.Collator(lang === 'ky' ? 'ky-KG' : lang);
  return countryCodes.map((code) => ({
    code,
    name: countryNames[code]?.[lang] || displayNames.of(code) || code,
    dial: `+${getCountryCallingCode(code)}`,
  })).sort((a, b) => a.code === b.code ? 0 : a.code === 'KG' ? -1 : b.code === 'KG' ? 1 : collator.compare(a.name, b.name));
}

function nationalDigits(value, country) {
  const trimmed = value.trim();
  if (trimmed.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(trimmed);
    if (parsed?.country === country) return parsed.nationalNumber.slice(0, 15);
    const digits = trimmed.replace(/\D/g, '');
    const dial = getCountryCallingCode(country);
    return (digits.startsWith(dial) ? digits.slice(dial.length) : digits).slice(0, 15);
  }
  return value.replace(/\D/g, '').slice(0, 15);
}

function parseValidPhone(digits, country) {
  const parsed = parsePhoneNumberFromString(digits, country);
  if (!parsed || parsed.country !== country || !parsed.isValid()) return null;
  if (/^(\d)\1{6,}$/.test(parsed.nationalNumber)) return null;
  return parsed.number;
}

export default function TestGate({ lang, onRegistered }) {
  const t = labels[lang];
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [country, setCountry] = useState('KG');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const phoneInput = useRef(null);
  const countries = useMemo(() => phoneOptions(lang), [lang]);
  const selectedCountry = countries.find((item) => item.code === country);
  const formattedPhone = useMemo(() => new AsYouType(country).input(phoneDigits), [country, phoneDigits]);
  const validPhone = useMemo(() => parseValidPhone(phoneDigits, country), [country, phoneDigits]);
  const phoneError = phoneTouched && phoneDigits && !validPhone;

  async function submit(event) {
    event.preventDefault();
    if (!validPhone) {
      setPhoneTouched(true);
      phoneInput.current?.focus();
      return;
    }
    setSaving(true);
    setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(PROFFTEST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.full_name,
          phone: validPhone,
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
      <div className="test-phone-field">
        <label htmlFor="phone-national">{t.phone}</label>
        <div className={`test-phone-control${phoneError ? ' is-invalid' : ''}`}>
          <div className="test-phone-country">
            <span aria-hidden="true"><strong>{selectedCountry.code}</strong> {selectedCountry.dial} <b>⌄</b></span>
            <select aria-label={t.phoneCountry} value={country} onChange={(event) => { setCountry(event.target.value); setPhoneDigits(''); setPhoneTouched(false); setError(''); }}>
              {countries.map((item) => <option key={item.code} value={item.code}>{item.name} ({item.dial})</option>)}
            </select>
          </div>
          <input ref={phoneInput} id="phone-national" name="phone_national" type="tel" inputMode="numeric" autoComplete="tel-national" required value={formattedPhone} onChange={(event) => { setPhoneDigits(nationalDigits(event.target.value, country)); setError(''); }} onBlur={() => setPhoneTouched(true)} placeholder={country === 'KG' ? '700 000 000' : t.phonePlaceholder} aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? 'phone-error' : 'phone-hint'} />
        </div>
        <p id={phoneError ? 'phone-error' : 'phone-hint'} className={`test-phone-hint${phoneError ? ' is-error' : ''}`} role={phoneError ? 'alert' : undefined}>{phoneError ? t.phoneInvalid : `${selectedCountry.name} · ${t.phoneHint}`}</p>
      </div>
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
