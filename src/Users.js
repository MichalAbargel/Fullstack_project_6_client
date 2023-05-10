import { Link, Outlet } from "react-router-dom";

function Users() {
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
      </ul>
      <Outlet/>
    </nav>
  );
}

export default Users;