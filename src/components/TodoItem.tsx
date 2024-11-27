import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${todo.completed 
            ? 'bg-green-500 border-green-500' 
            : 'border-gray-300 hover:border-green-500'
          }`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 focus:outline-none"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}