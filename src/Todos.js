import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Todos() {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("serial");

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

  function handleTodos() {
    return (
      <div className="todos-container">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label className="mcui-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    const updatedTodos = [...todos];
                    const updatedTodo = { ...todo, completed: !todo.completed };
                    const index = updatedTodos.findIndex(
                      (t) => t.id === todo.id
                    );
                    updatedTodos[index] = updatedTodo;
                    setTodos(updatedTodos);
                  }}
                />
                <div>
                  <svg
                    className="mcui-check"
                    viewBox="-2 -2 35 35"
                    aria-hidden="true"
                  >
                    <title>checkmark-circle</title>
                    <polyline points="7.57 15.87 12.62 21.07 23.43 9.93" />
                  </svg>
                </div>
                {todo.title}
              </label>
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
