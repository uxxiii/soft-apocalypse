import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircleMore, Sparkles, X } from 'lucide-react';
import { SUBMISSION_CLOSE_DATE, formatIstDateTime } from '../lib/submissionWindow';

const faqEntries = [
  {
    id: 'submit',
    question: 'How do I submit?',
    answer:
      'Wait for the submission window to open, complete the form with your details, and upload an optional PDF, DOCX, or TXT file before the deadline.',
  },
  {
    id: 'formats',
    question: 'What file formats are allowed?',
    answer: 'The portal accepts .pdf, .docx, and .txt files up to 10MB.',
  },
  {
    id: 'deadline',
    question: 'What is the deadline?',
    answer:
      `Submissions close on ${formatIstDateTime(SUBMISSION_CLOSE_DATE)}. Anything after that is blocked automatically.`,
  },
  {
    id: 'edit',
    question: 'Can I edit my submission?',
    answer:
      'There is no inline edit flow in this version, so the safest approach is to submit the final version you want reviewed during the open window.',
  },
];

const initialMessages = [
  {
    id: 'intro',
    role: 'bot',
    text: 'Hi. I can answer a few common submission questions. Pick one below to get a quick answer.',
    visibleText:
      'Hi. I can answer a few common submission questions. Pick one below to get a quick answer.',
  },
];

export default function FAQBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [typingMessage, setTypingMessage] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!typingMessage) {
      return undefined;
    }

    let characterIndex = 0;
    const intervalId = window.setInterval(() => {
      characterIndex += 1;

      setMessages((current) =>
        current.map((message) =>
          message.id === typingMessage.id
            ? {
                ...message,
                visibleText: typingMessage.text.slice(0, characterIndex),
              }
            : message,
        ),
      );

      if (characterIndex >= typingMessage.text.length) {
        window.clearInterval(intervalId);
        setTypingMessage(null);
      }
    }, 14);

    return () => window.clearInterval(intervalId);
  }, [typingMessage]);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isOpen]);

  function handleQuestionClick(entry) {
    if (typingMessage) {
      return;
    }

    const timestamp = Date.now();
    const answerId = `bot-${entry.id}-${timestamp}`;

    setMessages((current) => [
      ...current,
      {
        id: `user-${entry.id}-${timestamp}`,
        role: 'user',
        text: entry.question,
        visibleText: entry.question,
      },
      {
        id: answerId,
        role: 'bot',
        text: entry.answer,
        visibleText: '',
      },
    ]);

    // Keep the typing effect isolated to the newest scripted answer.
    setTypingMessage({
      id: answerId,
      text: entry.answer,
    });
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-[min(24rem,calc(100vw-1.5rem))] overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/92 shadow-[0_30px_80px_-42px_rgba(23,34,52,0.8)] backdrop-blur-xl"
          >
            <div className="relative overflow-hidden border-b border-storm-slate/10 bg-deep-ink px-5 py-4 text-rain-mist">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,168,130,0.18),transparent_30%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="font-body text-[0.68rem] uppercase tracking-[0.34em] text-warm-sand/78">
                    FAQ bot
                  </p>
                  <h2 className="mt-3 font-heading text-3xl leading-none text-rain-mist">
                    Quick answers
                  </h2>
                  <p className="mt-2 font-body text-sm leading-6 text-rain-mist/72">
                    Scripted responses only. No AI, no guesswork.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/12 bg-white/8 p-2 text-rain-mist transition-colors duration-200 hover:bg-white/14"
                  aria-label="Close FAQ bot"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="max-h-[24rem] space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-[1.25rem] px-4 py-3 font-body text-sm leading-6 shadow-[0_12px_28px_-26px_rgba(23,34,52,0.76)] ${
                      message.role === 'user'
                        ? 'bg-deep-ink text-rain-mist'
                        : 'border border-storm-slate/10 bg-rain-mist/78 text-deep-ink'
                    }`}
                  >
                    {message.visibleText}
                    {typingMessage?.id === message.id ? (
                      <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-full bg-warm-sand/90 align-middle" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-storm-slate/10 bg-white/72 px-4 py-4 sm:px-5">
              <div className="flex flex-wrap gap-2">
                {faqEntries.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    disabled={Boolean(typingMessage)}
                    onClick={() => handleQuestionClick(entry)}
                    className={`rounded-full px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                      typingMessage
                        ? 'cursor-not-allowed bg-storm-slate/10 text-storm-slate/35'
                        : 'bg-rain-mist text-storm-slate hover:-translate-y-0.5 hover:bg-warm-sand hover:text-deep-ink'
                    }`}
                  >
                    {entry.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen((current) => !current)}
        className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-deep-ink px-5 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.24em] text-rain-mist shadow-[0_24px_60px_-28px_rgba(23,34,52,0.9)]"
      >
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-warm-sand">
          <MessageCircleMore size={18} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="hidden sm:inline">FAQ assistant</span>
        <Sparkles size={16} className="text-warm-sand" />
      </motion.button>
    </div>
  );
}
