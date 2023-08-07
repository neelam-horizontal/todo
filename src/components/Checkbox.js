import React from "react";

const Checkbox = ({
  showCheckbox,
  handleEditTodo,
  handleDelete,
  handleCheckboxChange,
  handleMoveToCompleted,
  index,
  item,
}) => (
    <>
        {!showCheckbox && (
            <div className="flex">
                <button
                    onClick={() => handleEditTodo(index)}
                    className="bg-blue-500 text-white py-1 px-2 mr-1"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white py-1 px-2"
                >
                    Delete
                </button>
            </div>
        )}

        {showCheckbox && (
            <>
                <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-2" />
                {item.completed && (
                    <button
                        onClick={() => handleMoveToCompleted(index)}
                        className="bg-blue-500 text-white py-1 px-2"
                    >
                        Move
                    </button>
                )}
            </>
        )}
    </>
);

export default Checkbox;
