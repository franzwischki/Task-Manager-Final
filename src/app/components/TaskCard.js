'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg mb-2 border transition-all ${
        done
          ? 'bg-slate-800/50 border-slate-700/50'
          : 'bg-slate-800 border-slate-700'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(id)}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            done
              ? 'bg-green-600 border-green-600'
              : 'border-slate-500 hover:border-green-500'
          }`}
        >
          {done && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <span
          className={`text-sm truncate transition-all ${
            done ? 'line-through text-slate-500' : 'text-white'
          }`}
        >
          {title}
        </span>
      </div>

      <button
        onClick={() => onDelete(id)}
        aria-label="Delete task"
        className="ml-3 text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
