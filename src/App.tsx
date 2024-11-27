import React, { useState, useCallback } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFiltersBar } from './components/TodoFilters';
import { Todo, TodoFilters } from './types/todo';
import { generateId, filterTodos } from './utils/todoUtils';
import { CheckSquare } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TodoFilters>('all');

  const handleAddTodo = useCallback((text: string) => {
    setTodos(prev => [
      {
        id: generateId(),
        text,
        completed: false,
        createdAt: new Date(),
      },
      ...prev,
    ]);
  }, []);

  const handleToggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const filteredTodos = filterTodos(todos, currentFilter);
  const todoCount = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <CheckSquare size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
        </div>

        <TodoInput onAdd={handleAddTodo} />
        
        <div className="mt-8 space-y-4">
          <TodoFiltersBar
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            todoCount={todoCount}
          />
          
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {currentFilter === 'all' 
                ? 'No todos yet. Add one above!' 
                : `No ${currentFilter} todos`}
            </p>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;