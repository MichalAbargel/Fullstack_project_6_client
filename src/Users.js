import { useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    //ID or the whole user?
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user||params.userid != user.id) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Users;
