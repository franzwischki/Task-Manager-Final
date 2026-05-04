'use client';

import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const completed = tasks.filter((t) => t.done).length;
  const active = tasks.length - completed;

  const visible =
    filter === 'all'
      ? tasks
      : filter === 'done'
      ? tasks.filter((t) => t.done)
      : tasks.filter((t) => !t.done);

  function handleAdd(title) {
    const isDuplicate = tasks.some(
      (t) => t.title.toLowerCase() === title.toLowerCase()
    );
    if (isDuplicate) {
      setError('A task with that name already exists.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title,
      done: false,
      createdAt: Date.now(),
    };

    setTasks([newTask, ...tasks]);
    setError('');
  }

  function handleToggle(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  const filters = ['all', 'active', 'done'];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex items-start justify-center">
      <div className="w-full max-w-xl mt-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <p className="text-slate-400 text-sm mt-1">
            {active === 0 && tasks.length > 0
              ? 'All tasks complete!'
              : `${active} task${active !== 1 ? 's' : ''} remaining`}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
          <TaskStats
            total={tasks.length}
            completed={completed}
            active={active}
            onClearCompleted={handleClearDone}
          />

          <AddTaskForm onAdd={handleAdd} error={error} />

          <div className="flex gap-1 mb-5 bg-slate-800 p-1 rounded-lg">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-green-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <TaskList
            tasks={visible}
            onToggle={handleToggle}
            onDelete={handleDelete}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}