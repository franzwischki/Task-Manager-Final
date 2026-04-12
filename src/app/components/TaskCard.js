'use client';

export default function TaskCard({
  id,
  title,
  done,
  onToggle,
  onDelete,
}) {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-3 rounded mb-2">
      <span
        className={done ? 'line-through text-gray-400' : ''}
      >
        {title}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(id)}
          className="text-green-400"
        >
          Toggle
        </button>

        <button
          onClick={() => onDelete(id)}
          className="text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}