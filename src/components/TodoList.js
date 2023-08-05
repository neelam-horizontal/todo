import TodoModal from "./TodoModal";
import React, { useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (event) => {
    setTodo(event.target.value);
  };

  const handleAddTodo = () => {
    // console.log("todo ", todo)
    // console.log("todoItems ", todoItems)
    if (todo.trim() !== "") {
      setTodoItems([...todoItems, { title: todo.trim(), completed: false }]);
      setTodo("");
    }
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    console.log(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleSaveTodo = (updatedTodo) => {
    console.log(updatedTodo);
    if (updatedTodo.trim() !== "") {
      const updatedTodoItems = [...todoItems];
      updatedTodoItems[editingIndex].title = updatedTodo.trim();
      setTodoItems(updatedTodoItems);
    }
    setEditingIndex(null);
    console.log(editingIndex);
  };

  const handleUpdateStatus = () => {
    setShowCheckbox(!showCheckbox);
  };

  const handleCheckboxChange = (index) => {
    console.log(todoItems);
    const updatedTodoItems = [...todoItems];
    updatedTodoItems[index].completed = !updatedTodoItems[index].completed;
    console.log(updatedTodoItems[index].completed);
    console.log(updatedTodoItems[index]);
    console.log(todoItems);
    setTodoItems(updatedTodoItems);
    console.log(completedItems);
  };

  const handleMoveToCompleted = (index) => {
    // const completedItem = todoItems[index];
    // setCompletedItems((prevCompletedItems) => [
    //   ...prevCompletedItems,
    //   completedItem,
    // ]);
    setCompletedItems([...completedItems, todoItems[index]]);

    // const updatedTodoItems =
    // todoItems.map((todo, i) => i !== index ? todo : null).reduce((acc, item) => {
    //     if (item !== null) {
    //         acc.push(item);
    //     }
    //     return acc;
    // }, []);

    // const updatedTodoItems = todoItems.filter((todo, i) =>
    // i !== index ? todo : null
    // );

    // const updatedTodoItems = todoItems.map((todo, i) =>
    // i !== index ? todo : null).filter(Boolean);

    // const updatedTodoItems = todoItems.filter((item, i) => i !== index);
    const updatedTodoItems = todoItems.filter((_, i) => i !== index);

    setTodoItems(updatedTodoItems);
  };

//   const handleMoveToTodoItems = (index) => {
//     const completedItem = completedItems[index];
//     completedItem.completed = false;

//     setTodoItems([...todoItems, completedItem]);

//     const updatedCompletedItems = completedItems.filter((_, i) => i !== index);
//     setCompletedItems(updatedCompletedItems);

//     console.log(updatedCompletedItems);
//     console.log(completedItems);
//   };

const handleMoveToTodoItems = (index) => {
    // Extract the completed item from the completedItems array
    const [movedItem] = completedItems.splice(index, 1);
  
    // Update the completed property of the moved item
    movedItem.completed = false;
  
    // Add the moved item to the todoItems array
    setTodoItems([...todoItems, movedItem]);
  
    // Update the completedItems array without the moved item
    setCompletedItems([...completedItems]);
  
    // Logging for verification
    console.log(todoItems);
    console.log(completedItems);
  };
  
  const handleDelete = (index ) => {
    const deleteItem = todoItems.filter((_, e) => e !== index);
    setTodoItems([...deleteItem]);
    console.log(deleteItem)
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-4 text-red-500 text-center">
        ToDo App
      </h1>
      <div className="input-section mb-4 flex">
        <input
          type="text"
          placeholder="Enter ToDo item"
          className="border border-slate-300 p-2 mr-2 flex-1"
          value={todo}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4"
          onClick={handleAddTodo}
        >
          Add ToDo
        </button>
      </div>

      <div className="flex">
        <div className="ToDo-items mt-8 w-6/12 float-left pr-8">
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
                    onSave={handleSaveTodo}
                  />
                ) : (
                  <>
                    <span>{item.title}</span>

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
                          className="mr-2"
                        />
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
                )}
              </div>
            ))
          )}

          {todoItems.length !== 0 && (
            <button
              className={`${
                showCheckbox ? "bg-red-500" : "bg-blue-500"
              } text-white py-2 px-4 mt-4`}
              //   onClick={() => setShowCheckbox(!showCheckbox)}
              onClick={handleUpdateStatus}
            >
              {showCheckbox ? "Done Updating" : "Update Status"}
            </button>
          )}
        </div>
        <div className="completed-items mt-8 w-6/12 float-right">
          <h2 className="text-xl font-semibold mb-2">Completed Items</h2>
          {completedItems.length === 0 ? (
            <div className="text-red-500">No data found</div>
          ) : (
            completedItems.map((item, index) => (
              <div
                key={index}
                className="todo-item flex items-center justify-between mb-2"
              >
                <span>{item.title}</span>
                <button
                  onClick={() => handleMoveToTodoItems(index)}
                  className="bg-blue-500 text-white py-1 px-2"
                >
                  Move to ToDo Items
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
