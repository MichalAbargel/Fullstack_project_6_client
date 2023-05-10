import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Users() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      localStorage.removeItem("user");
    }
  }, [login]);

  const handleLogin = () => {
    setLogin(false);
    navigate('/login');
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="posts">Posts</Link>
        </li>
        <li>
          <Link to="info">Info</Link>
        </li>
        <li>
          <Link to="albums">Albums</Link>
        </li>
        <li>
          <Link to="todos">Todos</Link>
        </li>
        <li>
          <button onClick={handleLogin}>Logout</button>
        </li>
      </ul>
      <Outlet />
    </nav>
  );
}

export default Users;
