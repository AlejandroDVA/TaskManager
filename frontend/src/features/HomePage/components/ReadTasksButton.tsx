import React, { useState } from 'react';
import { useFetchTasks } from '../hooks/useFetchTasks';
import { UpdateTaskForm } from './UpdateTaskForm';

export const ReadTasksButton: React.FC = () => {
  const { data, loading, error, fetchData } = useFetchTasks();
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const handleButtonClick = () => {
    if (!isTableVisible) {
      fetchData();
    }
    setIsTableVisible(!isTableVisible);
  };

  const handleEditClick = (task: any) => {
    setSelectedTask(task); // Set the selected task for editing
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isTableVisible ? 'Hide Tasks' : 'Fetch Tasks'}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {isTableVisible && data && data.length > 0 && (
        <div className="mt-4">
          <table className="table-auto border-collapse border border-gray-200 w-full">
            <thead>
              <tr className="bg-gray-100 text-customHeader">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Completed</th>
                <th className="border border-gray-300 px-4 py-2">Tags</th>
                <th className="border border-gray-300 px-4 py-2">Due Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((task: any) => (
                <tr key={task.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{task.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.completed ? 'Yes' : 'No'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.tags.join(', ')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {}
      {selectedTask && (
        <UpdateTaskForm
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSuccess={() => {
            fetchData(); // Refresh the task list after a successful update
            setSelectedTask(null); // Close the form
          }}
        />
      )}
    </div>
  );
};
