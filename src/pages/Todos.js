import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import AddTaskModal from "./AddTaskModel";
import "../styles/todos.css";

function Todos() {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("serial");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState("");

  const getTodos = async () => {
    try {
      const response = await fetch(
        //`https://jsonplaceholder.typicode.com/todos/?userId=${params.userid}`
        `http://localhost:3500/api/todos/${params.userid}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setTodos(data);
        console.log(data);
      }
    } catch (error) {
      throw error; ////////////?
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    const sortedTodos = [...todos];
    switch (sort) {
      case "serial":
        sortedTodos.sort((a, b) => a.id - b.id);
        break;
      case "execution":
        sortedTodos.sort((a, b) => a.completed - b.completed);
        break;
      case "alphabetical":
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "random":
        sortedTodos.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    setTodos(sortedTodos);
  }, [sort]);

  //------------DELETE----------------

  const handleDeleteItemClick = (todoId) => {
    //delete the item
    console.log("try to delete post");
    console.log(todoId);
    fetch(`http://localhost:3500/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete resource");
        }
        console.log("todo (id: " + todoId + ") delete successfully");
        getTodos();
      })
      .catch((error) => {
        console.error("Error delete resource:", error);
      });
  };

  //------------DELETE----------------

  //------------UPDATE----------------

  const updateTask = (data) => {
    fetch("http://localhost:3500/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update resource");
        }
        console.log("todo (id: " + data.id + ") updated successfully");
      })
      .catch((error) => {
        console.error("Error updating resource:", error);
      });
  };
  const handleTitleChange = (event) => {
    setEditedTodoTitle(event.target.value);
  };

  const handleCheckboxChange = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        updateTask(updatedTodo);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
    console.log("Update complete on db");
  };

  const handleTextDoubleClick = (itemId, title) => {
    setEditingTodoId(itemId);
    setEditedTodoTitle(title);
  };

  const handleTextKeyDown = (todoId, e) => {
    if (e.key === "Enter") {
      const newTitle = e.target.value;
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          if (newTitle !== todo.title) {
            updateTask({
              id: todoId,
              title: newTitle,
              completed: todo.completed,
            });
          }
          return { ...todo, title: newTitle };
        }
        return todo;
      });
      setTodos(updatedTodos);
      console.log("Update title on db");
      setEditingTodoId(null);
      setEditedTodoTitle(null);
    }
  };

  const handleTextBlur = (itemId) => {
    if (editingTodoId === itemId) {
      // Perform necessary updates here
      // ...
    }
    setEditingTodoId(null);
    setEditedTodoTitle(null);
  };
  //------------UPDATE----------------

  //------------ADD----------------

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // add task
  const handleAddTask = (task) => {
    // add task
    const data = {
      userId: params.userid,
      title: task.title,
      completed: task.completed,
    };

    fetch("http://localhost:3500/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // the insert success
          // console.log(response)
          console.log("Added task");
          //console.log("Added task:", task);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then(() => {
        // update
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //------------ADD----------------

  function handleTodos() {
    return (
      <div className="todos-container">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <FaTrash
                className="delete-icon"
                onClick={() => handleDeleteItemClick(todo.id)}
              />
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={editedTodoTitle}
                  onChange={handleTitleChange}
                  onKeyDown={(e) => handleTextKeyDown(todo.id, e)}
                  onBlur={() => handleTextBlur(todo.id)}
                  autoFocus
                />
              ) : (
                <span
                  onDoubleClick={() =>
                    handleTextDoubleClick(todo.id, todo.title)
                  }
                >
                  {todo.title}
                </span>
              )}
            </li>
          ))}
        </ul>
        {todos.map((todo) => (
          <div key={todo.id}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="background">
      <div>
        <h1>Task Manager</h1>
        <button onClick={handleOpenModal}>Add Task</button>

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddTask={handleAddTask}
        />
      </div>
      {/* <h2 className="center">todos</h2> */}
      <div className="row mt-10">
        <div className="col-md-6 offset-md-3">
          <div className="d-flex align-items-center">
            <p className="me-2 mb-0 h5" style={{ whiteSpace: "nowrap" }}>
              Sort By:
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-select"
              aria-label="Select Option"
            >
              <option value="serial">Serial</option>
              <option value="execution">Execution</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="random">Random</option>
            </select>
          </div>
        </div>
      </div>

      <div>{handleTodos()}</div>
    </div>
  );
}

export default Todos;
