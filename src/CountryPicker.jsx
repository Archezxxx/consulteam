import { useEffect, useMemo, useRef, useState } from 'react';

function flagUrl(code) {
  return `/flags/${code.toLowerCase()}.svg`;
}

export default function CountryPicker({ countries, value, onChange, label, searchLabel, emptyLabel }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const selected = countries.find((item) => item.code === value);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return search ? countries.filter((item) => `${item.name} ${item.code} ${item.dial}`.toLocaleLowerCase().includes(search)) : countries;
  }, [countries, query]);

  useEffect(() => {
    if (!open) return undefined;
    searchRef.current?.focus();
    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  useEffect(() => {
    if (!open || !filtered[activeIndex]) return;
    listRef.current?.querySelector(`#phone-country-${filtered[activeIndex].code}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex, filtered]);

  function choose(code) {
    onChange(code);
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
    triggerRef.current?.focus();
  }

  function handleSearchKey(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (filtered[activeIndex]) choose(filtered[activeIndex].code);
    }
  }

  return <div className="test-phone-country" ref={rootRef}>
    <button ref={triggerRef} className="test-country-trigger" type="button" aria-label={`${label}: ${selected.name} ${selected.dial}`} aria-expanded={open} aria-haspopup="listbox" aria-controls="phone-country-list" onClick={() => { setOpen((wasOpen) => !wasOpen); setQuery(''); setActiveIndex(0); }} onKeyDown={(event) => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); } }}>
      <img src={flagUrl(value)} alt="" width="30" height="24" />
      <span>{selected.dial}</span>
      <span className="test-country-chevron" aria-hidden="true">⌄</span>
    </button>
    {open ? <div className="test-country-popover">
      <input ref={searchRef} type="search" role="combobox" aria-label={searchLabel} aria-autocomplete="list" aria-expanded="true" aria-controls="phone-country-list" aria-activedescendant={filtered[activeIndex] ? `phone-country-${filtered[activeIndex].code}` : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={handleSearchKey} placeholder={searchLabel} />
      <div ref={listRef} id="phone-country-list" className="test-country-list" role="listbox" aria-label={label}>
        {filtered.map((item, index) => <button type="button" role="option" id={`phone-country-${item.code}`} key={item.code} aria-selected={item.code === value} className={`test-country-option${index === activeIndex ? ' is-active' : ''}`} onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(item.code)}>
          <img src={flagUrl(item.code)} alt="" width="28" height="22" loading="lazy" />
          <span>{item.name}</span>
          <small>{item.dial}</small>
        </button>)}
        {filtered.length === 0 ? <p className="test-country-empty">{emptyLabel}</p> : null}
      </div>
    </div> : null}
  </div>;
}
