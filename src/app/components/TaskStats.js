'use client';

export default function TaskStats({ total, completed, active, onClearCompleted }) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-5">
      <div className="flex gap-3 text-xs mb-3">
        <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full text-slate-300">
          Total: <strong className="text-white">{total}</strong>
        </span>
        <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full text-slate-300">
          Active: <strong className="text-white">{active}</strong>
        </span>
        <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full text-slate-300">
          Done: <strong className="text-green-400">{completed}</strong>
        </span>

        {completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="ml-auto text-red-400 hover:text-red-300 transition-colors text-xs"
          >
            Clear done
          </button>
        )}
      </div>

      {total > 0 && (
        <div className="w-full bg-slate-800 rounded-full h-1.5">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}