// import { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
// import Menu from "./Nav";

// /*--------------------
//   Items
//   --------------------*/
// const guestItems = [
//   {
//     name: "Posts",
//     color: "#f44336",
//     href: "/posts",
//   },
//   {
//     name: "Info",
//     color: "#e91e63",
//     href: "/info",
//   },
// ];

// const userItems = [
//   {
//     name: "Posts",
//     color: "#f44336",
//     href: "/users/:userid/posts",
//   },
//   {
//     name: "Info",
//     color: "#e91e63",
//     href: "/users/:userid/info",
//   },
//   {
//     name: "Todos",
//     color: "#673ab7",
//     href: "/users/:userid/todos",
//   },
// ];

// function Users() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const [name, setName] = useState();
//   const [isConnected, setIsConnected] = useState(false); // Define the 'isConnected' variable

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || params.userid !== user.id) {
//       navigate("/login");
//     } else {
//       setName(user.name);
//       setIsConnected(true); // Set 'isConnected' to true if the user is logged in
//     }
//   }, []);

//   // Select the appropriate menu items based on the user's connection status
//   const menuItems = isConnected ? userItems : guestItems;

//   return (
//     <div className="background home-page">
//       <nav>
//         <div className="background">
//           <Menu items={menuItems} />
//           <h1>{name}</h1>
//         </div>
//       </nav>
//       <Outlet />
//     </div>
//   );
// }

// export default Users;
