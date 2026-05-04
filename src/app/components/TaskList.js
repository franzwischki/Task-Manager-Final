'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete, filter }) {
  if (tasks.length === 0) {
    const messages = {
      all: 'No tasks yet. Add one above!',
      active: 'No active tasks. Nice work!',
      done: 'Nothing completed yet.',
    };

    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        {messages[filter] || 'No tasks found.'}
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}