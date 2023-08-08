import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Link, useNavigate, Outlet } from "react-router-dom";

import "../styles/Menu.css";

function Menu({ items }) {
  const $root = React.useRef();
  const $indicator1 = React.useRef();
  const $indicator2 = React.useRef();
  const [active, setActive] = useState(0);

  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect();
    const activeItem = $root.current.querySelector(".item.active"); // Get the active item using a CSS selector
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: "elastic.out(.7, .7)",
      duration: 0.8,
    };

    gsap.to($indicator1.current, {
      ...settings,
    });

    gsap.to($indicator2.current, {
      ...settings,
      duration: 1,
    });
  };

  useEffect(() => {
    animate();
    window.addEventListener("resize", animate);

    return () => {
      window.removeEventListener("resize", animate);
    };
  }, [active]);

  const handleLogout = (onClick) => {
    localStorage.removeItem("user");
    onClick();
    //  navigate("/home");
  };

  return (
<>     <nav>
        <div className="background">
          <div ref={$root} className="menu">
            {items.map((item, index) => (
              <Link
                key={item.name}
                className={`item ${active === index ? "active" : ""}`}
                onMouseEnter={() => {
                  setActive(index);
                }}
                to={item.href}
                onClick={
                  item.name === "Logout"
                    ? () => handleLogout(item.onClick)
                    : null
                }
              >
                {item.name}
              </Link>
            ))}
            <div ref={$indicator1} className="indicator" />
            <div ref={$indicator2} className="indicator" />
          </div>
        </div>
      </nav>
      <Outlet /></> 
  );
}

export default Menu;
