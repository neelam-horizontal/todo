import React from "react";
import TodoModal from "./TodoModal";
import Checkbox from "./Checkbox";

const AddTodo = ({
  todoItems,
  editingIndex,
  handleCancelEdit,
  handleSaveTodo,
  showCheckbox,
  handleEditTodo,
  handleDelete,
  handleCheckboxChange,
  handleMoveToCompleted,
}) => (
    <>
        <h2 className="text-xl font-semibold mb-2">ToDo Items</h2>

        {todoItems.length === 0 ? (
            <div className="text-red-500">No data found</div>
        ) : (
            todoItems.map((item, index) => (
                <div
                    key={index}
                    className="todo-item flex items-center justify-between mb-2"
                >
                    {editingIndex === index ? (
                        <TodoModal
                            initialValue={item.title}
                            onCancel={handleCancelEdit}
                            onSave={handleSaveTodo} />
                    ) : (
                        <>
                            <span>{item?.title}</span>

                            <Checkbox
                                index={index}
                                item={item}
                                showCheckbox={showCheckbox}
                                handleEditTodo={handleEditTodo}
                                handleDelete={handleDelete}
                                handleCheckboxChange={handleCheckboxChange}
                                handleMoveToCompleted={handleMoveToCompleted} />
                        </>
                    )}
                </div>
            ))
        )}
    </>
);

export default AddTodo;
