'use client';

import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];

    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const completed = tasks.filter((t) => t.done).length;

  const visible =
    filter === 'all'
      ? tasks
      : filter === 'done'
      ? tasks.filter((t) => t.done)
      : tasks.filter((t) => !t.done);

  function handleAdd(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-xl mx-auto bg-slate-900 p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        <TaskStats
          total={tasks.length}
          completed={completed}
          active={tasks.length - completed}
          onClearCompleted={handleClearDone}
        />

        <AddTaskForm onAdd={handleAdd} />

        <div className="flex gap-2 mb-4">
          {['all', 'active', 'done'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter === f
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700'
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
        />
      </div>
    </div>
  );
}
