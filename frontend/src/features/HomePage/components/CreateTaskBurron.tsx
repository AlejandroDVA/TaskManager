import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const CreateTaskButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      completed: false,
      tags: '',
      dueDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      dueDate: Yup.date().required('Due date is required'),
      tags: Yup.string().required('Tags are required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            tags: values.tags.split(',').map((tag) => tag.trim()), // Convertir tags a array
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create task');
        }

        alert('Task created successfully!');
        setShowForm(false);
        formik.resetForm();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        alert(errorMessage);
      }
    },
  });

  return (
    <div>
      {}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create Task
      </button>

      {}
      {showForm && (
        <form
          onSubmit={formik.handleSubmit}
          className="mt-4 p-4 border rounded bg-gray-800 text-white"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-yellow-400">
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded bg-gray-700 text-white"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-400 text-sm">{formik.errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium text-yellow-400">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded bg-gray-700 text-white"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-400 text-sm">{formik.errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block font-medium text-yellow-400">
              Tags (comma separated):
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded bg-gray-700 text-white"
            />
            {formik.touched.tags && formik.errors.tags && (
              <p className="text-red-400 text-sm">{formik.errors.tags}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="dueDate" className="block font-medium text-yellow-400">
              Due Date:
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded bg-gray-700 text-white"
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <p className="text-red-400 text-sm">{formik.errors.dueDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="completed"
                checked={formik.values.completed}
                onChange={formik.handleChange}
                className="form-checkbox"
              />
              <span>Completed</span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
