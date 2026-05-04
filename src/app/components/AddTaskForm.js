'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd, error }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  }

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          maxLength={100}
          className={`flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm placeholder-slate-500 border outline-none transition-all focus:border-green-500 ${
            error ? 'border-red-500' : 'border-slate-700'
          }`}
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          Add
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-xs mt-1.5">{error}</p>
      )}
    </div>
  );
}