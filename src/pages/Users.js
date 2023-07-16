import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Menu from "./Nav";

/*--------------------
  Items
  --------------------*/
const items = [
  {
    name: "Posts",
    color: "#f44336",
    href: "posts",
  },
  {
    name: "Info",
    color: "#e91e63",
    href: "info",
  },
  {
    name: "Todos",
    color: "#673ab7",
    href: "todos",
  },
  {
    name: "Logout",
    color: "#f44336",
    href: "/login",
  },
];

function Users() {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState();

  useEffect(() => {
    //ID or the whole user?
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user || params.userid != user.id) {
      navigate("/login");
    } else {
      setName(user.name);
    }
  }, []);

  return (
    <div className="background home-page">
      <nav>
        <div className="background">
          <Menu items={items} />
          <h1>{name}</h1>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Users;
