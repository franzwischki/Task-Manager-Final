'use client';

export default function TaskStats({
  total,
  completed,
  active,
  onClearCompleted,
}) {
  return (
    <div className="flex justify-between mb-4 text-sm">
      <div>
        <p>Total: {total}</p>
        <p>Active: {active}</p>
        <p>Done: {completed}</p>
      </div>

      <button
        onClick={onClearCompleted}
        className="text-red-400"
      >
        Clear Done
      </button>
    </div>
  );
}