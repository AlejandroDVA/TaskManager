import React from 'react';
import { ReadTasksButton } from './components/ReadTasksButton';
import { CreateTaskButton } from './components/CreateTaskBurron';

export const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4 flex gap-4">
        <ReadTasksButton />
        <CreateTaskButton />
      </div>
    </div>
  );
};
