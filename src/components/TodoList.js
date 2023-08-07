import AddTodo from "./AddTodo";
// import Checkbox from "./Checkbox";
import CompletedItems from "./CompletedItems";
// import TodoModal from "./TodoModal";
import React, { useRef, useState } from "react";

const TodoList = () => {
  const inputRef = useRef(null);

  // const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [editingIndex, setEditingIndex] = useState(false);

  // const handleInputChange = (event) => {
    // setTodo(event.target.value);
  // };

  const handleAddTodo = () => {
    // console.log("todo ", todo)
    // console.log("todoItems ", todoItems)
    
    if (inputRef.current.value.trim() !== "") {
      setTodoItems([...todoItems,
        { title: inputRef.current.value.trim(), completed: false }]);
      }
      inputRef.current.value = ""
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    console.log(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(false);
  };

  const handleSaveTodo = (updatedTodo) => {
    console.log(updatedTodo);
    if (updatedTodo.trim() !== "") {
      const updatedTodoItems = [...todoItems];
      updatedTodoItems[editingIndex].title = updatedTodo.trim();
      setTodoItems(updatedTodoItems);
    }
    setEditingIndex(false);
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
    const [movedItem] = completedItems.splice(index, 1);
    movedItem.completed = false;
    setTodoItems([...todoItems, movedItem]);
    setCompletedItems([...completedItems]);
    console.log(todoItems);
    console.log(completedItems);
  };

  const handleDelete = (index) => {
    const deleteItem = todoItems.filter((_, e) => e !== index);
    setTodoItems([...deleteItem]);
    console.log(deleteItem);
  };

  return (
    <div className="container mx-auto my-8 pl-7 pr-7">
      <h1 className="text-4xl font-bold mb-4 text-red-500 text-center">
        ToDo App
      </h1>
      <div className="input-section mb-4 flex">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter ToDo item"
          className="border border-slate-300 p-2 mr-2 flex-1"
          // value={todo}
          // onChange={(event) => {
          //   setTodo(event.target.value);
          // }}
        />
        {/* {console.log(todo)} */}
        <button
          className="bg-blue-500 text-white py-2 px-4"
          onClick={handleAddTodo}
        >
          Add ToDo
        </button>
      </div>

      <div className="flex">
        <div className="ToDo-items mt-8 w-6/12 float-left pr-8">
          <AddTodo
            todoItems={todoItems}
            editingIndex={editingIndex}
            handleCancelEdit={handleCancelEdit}
            handleSaveTodo={handleSaveTodo}
            showCheckbox={showCheckbox}
            handleEditTodo={handleEditTodo}
            handleDelete={handleDelete}
            handleCheckboxChange={handleCheckboxChange}
            handleMoveToCompleted={handleMoveToCompleted}
          />

          {todoItems?.length !== 0 && (
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
          <CompletedItems
            completedItems={completedItems}
            handleMoveToTodoItems={handleMoveToTodoItems}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
