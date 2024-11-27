import React from 'react';
import { TodoFilters } from '../types/todo';

interface TodoFiltersProps {
  currentFilter: TodoFilters;
  onFilterChange: (filter: TodoFilters) => void;
  todoCount: {
    total: number;
    active: number;
    completed: number;
  };
}

export function TodoFiltersBar({ currentFilter, onFilterChange, todoCount }: TodoFiltersProps) {
  const filters: TodoFilters[] = ['all', 'active', 'completed'];

  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-gray-500">
        {currentFilter === 'all' && `${todoCount.total} total`}
        {currentFilter === 'active' && `${todoCount.active} active`}
        {currentFilter === 'completed' && `${todoCount.completed} completed`}
      </div>
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1 rounded-full text-sm ${
              currentFilter === filter
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}