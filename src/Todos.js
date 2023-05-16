import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Todos() {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("serial");

  const getTodos = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/?userId=${params.userid}`
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
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
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
    <div>
      <h2>todos</h2>
      <div>
        Sort by:
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="serial">Serial</option>
          <option value="execution">Execution</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div>{handleTodos()}</div>
    </div>
  );
}

export default Todos;
