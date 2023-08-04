import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Info from "./pages/Info";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Menu from "./pages/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/comment.css";
import "./styles/post.css";
import "./styles/todos.css";
import "./styles/gallery.css";
import "./styles/userInfo.css";
import "./styles/deleteBtn.css";

function App() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);
  const [logoutChange, setLogoutChange] = useState(null);

  // Define the handleLogout function
  const handleLogout = () => {
    setLogoutChange("logout");
  };

  // Define the handleLogout function
  const handleLogin = () => {
    setLogoutChange("login");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsConnected(true);
      setUserId(user.id);
    } else {
      setIsConnected(false);
      setUserId(null);
    }
  }, [logoutChange]);

  // Define the menu items for the guest and logged-in user
  const guestMenuItems = [
    { name: "Home", color: "#f44336", href: "/" },
    { name: "Categories", color: "#e91e63", href: "/categories" },
    { name: "Cart", color: "#673ab7", href: "/cart" },
    { name: "Login", color: "#f44336", href: "/login" },
  ];

  const userMenuItems = [
    { name: "Home", color: "#f44336", href: "/" },
    { name: "Categories", color: "#e91e63", href: "/categories" },
    {
      name: "Cart",
      color: "#673ab7",
      href: `/users/${userId}/cart`,
      userId: userId,
    },
    {
      name: "Wishlist",
      color: "#f44336",
      href: `/users/${userId}/wishlist`,
      userId: userId,
    },
    {
      name: "Info",
      color: "#e91e63",
      href: `/users/${userId}/info`,
      userId: userId,
    },
    { name: "Logout", color: "#f44336", onClick: handleLogout },
  ];

  return (
    <div className="background home-page">
       <Menu items={isConnected ? userMenuItems : guestMenuItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        {!isConnected && <Route path="/cart" element={<Cart />} />}
        {isConnected && (
          <>
            <Route path="/users/:userid/cart" element={<Cart />} />
            <Route path="/users/:userid/wishlist" element={<WishList />} />
            <Route path="/users/:userid/info" element={<Info />} />
          </>
        )}
        {!isConnected && (
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        )}
        {!isConnected && (
          <Route
            path="/register"
            element={<Register handleLogin={handleLogin} />}
          />
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
