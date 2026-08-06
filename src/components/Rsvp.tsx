import { useState, type FormEvent } from 'react';

const GAS_URL = import.meta.env.PUBLIC_GAS_URL;

const EVENTS = [
  { key: 'mehendi', label: 'Mehendi', sub: 'Fri, Nov 13' },
  { key: 'ceremony', label: 'Wedding Ceremony', sub: 'Sat, Nov 14 (AM)' },
  { key: 'reception', label: 'Reception', sub: 'Sat, Nov 14 (PM)' },
] as const;

type EventKey = (typeof EVENTS)[number]['key'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Rsvp() {
  const [name, setName] = useState('');
  const [eventGuests, setEventGuests] = useState<Record<EventKey, number>>({
    mehendi: 0,
    ceremony: 0,
    reception: 0,
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const setCount = (key: EventKey, value: number) =>
    setEventGuests((prev) => ({ ...prev, [key]: Math.max(0, value) }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;

    if (!GAS_URL) {
      console.warn(
        'PUBLIC_GAS_URL is not set — this RSVP was not saved anywhere. See google-apps-script/SETUP.md.'
      );
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      // mode: "no-cors" + a text/plain body sidesteps Apps Script's lack of CORS
      // headers, at the cost of not being able to read the response back.
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: name.trim(),
          mehendiGuests: eventGuests.mehendi,
          ceremonyGuests: eventGuests.ceremony,
          receptionGuests: eventGuests.reception,
          message: message.trim(),
        }),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-gold-500/30 bg-white/70 px-8 py-14 text-center">
        <p className="font-display text-2xl text-ink">Thank you{name ? `, ${name.split(' ')[0]}` : ''}!</p>
        <p className="mt-2 font-sans text-sm text-ink/70">
          Your RSVP has been recorded. We can't wait to celebrate with you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gold-500/20 bg-white/70 px-8 py-10 text-left shadow-[0_20px_60px_-30px_rgba(169,132,26,0.35)] sm:px-12"
    >
      <div>
        <label className="font-sans text-xs tracking-[0.2em] uppercase text-ink/70">Full Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-gold-500"
          placeholder="Jane Doe"
        />
      </div>

      <fieldset className="mt-6">
        <legend className="font-sans text-xs tracking-[0.2em] uppercase text-ink/70">
          Number of guests attending each event
        </legend>
        <div className="mt-3 space-y-3">
          {EVENTS.map((ev) => (
            <div key={ev.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-sans text-sm text-ink/90">{ev.label}</p>
                <p className="font-sans text-xs text-ink/50">{ev.sub}</p>
              </div>
              <input
                type="number"
                min={0}
                max={20}
                value={eventGuests[ev.key]}
                onChange={(e) => setCount(ev.key, Number(e.target.value))}
                className="w-20 rounded-lg border border-ink/15 bg-ivory px-3 py-2 text-center font-sans text-sm text-ink outline-none focus:border-gold-500"
              />
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label className="font-sans text-xs tracking-[0.2em] uppercase text-ink/70">Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-gold-500"
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 font-sans text-sm text-red-600">
          Something went wrong sending your RSVP — please try again in a moment.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 w-full rounded-full bg-gold-600 px-8 py-3 font-sans text-xs tracking-[0.25em] uppercase text-white transition-opacity hover:bg-gold-700 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
      </button>
    </form>
  );
}
