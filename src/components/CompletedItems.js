import React from "react";

const CompletedItems = ({ completedItems, handleMoveToTodoItems }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Completed Items</h2>
      {completedItems?.length === 0 ? (
        <div className="text-red-500">No data found</div>
      ) : (
        completedItems.map((item, index) => (
          <div
            key={index}
            className="todo-item flex items-center justify-between mb-2"
          >
            <span>{item?.title}</span>
            <button
              onClick={() => handleMoveToTodoItems(index)}
              className="bg-blue-500 text-white py-1 px-2"
            >
              Move to ToDo Items
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default CompletedItems;
