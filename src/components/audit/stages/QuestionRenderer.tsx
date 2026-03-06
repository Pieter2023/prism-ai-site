import { motion } from 'framer-motion';
import { useAudit } from '../../../context/AuditContext';
import { type Question } from '../../../data/auditQuestions';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

interface QuestionRendererProps {
  question: Question;
}

export default function QuestionRenderer({ question }: QuestionRendererProps) {
  const { state, setAnswer } = useAudit();
  const value = state.responses[question.id];

  return (
    <motion.div variants={itemVariants} className="mb-6">
      <label className="block text-sm font-medium text-slate-200 mb-3">
        {question.text}
      </label>

      {question.type === 'single' && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAnswer(question.id, opt.value)}
              className={`text-left px-4 py-3 rounded-xl border transition-all min-h-[44px] ${
                value === opt.value
                  ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_-3px_rgba(19,91,236,0.3)]'
                  : 'border-white/6 bg-white/3 text-slate-300 hover:border-white/15 hover:bg-white/5'
              }`}
            >
              <span className="text-sm">{opt.label}</span>
            </button>
          ))}
        </div>
      )}

      {question.type === 'multi' && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options.map(opt => {
            const selected = Array.isArray(value) && value.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  const current = (Array.isArray(value) ? value : []) as string[];
                  const next = selected
                    ? current.filter(v => v !== opt.value)
                    : [...current, opt.value];
                  setAnswer(question.id, next);
                }}
                className={`text-left px-4 py-3 rounded-xl border transition-all min-h-[44px] flex items-center gap-3 ${
                  selected
                    ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_-3px_rgba(19,91,236,0.3)]'
                    : 'border-white/6 bg-white/3 text-slate-300 hover:border-white/15 hover:bg-white/5'
                }`}
              >
                <span className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  selected ? 'border-primary bg-primary' : 'border-white/20'
                }`}>
                  {selected && (
                    <span className="material-symbols-outlined text-white text-sm" style={{ fontSize: '14px' }}>check</span>
                  )}
                </span>
                <span className="text-sm">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'scale' && (
        <div className="space-y-3">
          <div className="relative">
            <input
              type="range"
              min={question.min || 1}
              max={question.max || 10}
              step={1}
              value={(value as number) || question.min || 1}
              onChange={e => setAnswer(question.id, parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer audit-slider"
              style={{
                background: `linear-gradient(to right, #135bec ${(((value as number || question.min || 1) - (question.min || 1)) / ((question.max || 10) - (question.min || 1))) * 100}%, rgba(255,255,255,0.05) 0%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>{question.scaleLabels?.[0]}</span>
            <span className="text-primary font-semibold text-lg">
              {(value as number) || question.min || 1}
            </span>
            <span>{question.scaleLabels?.[1]}</span>
          </div>
        </div>
      )}

      {question.type === 'text' && (
        <input
          type={question.id === 'contact-email' ? 'email' : question.id === 'contact-phone' ? 'tel' : 'text'}
          value={(value as string) || ''}
          onChange={e => setAnswer(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/6 text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors min-h-[44px]"
        />
      )}
    </motion.div>
  );
}
