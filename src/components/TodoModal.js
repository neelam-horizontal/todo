import React, { useState } from 'react';

const TodoModal = ({ initialValue, onCancel, onSave }) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Edit ToDo item</h3>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <div className="flex justify-end">
          <button className="mr-2 bg-gray-400 text-white py-2 px-4 rounded" onClick={onCancel}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
