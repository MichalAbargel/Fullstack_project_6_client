import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Info() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    //id or the whole user?
    const user = JSON.parse(localStorage.getItem("user"));
    if (params.userid != user.id) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    if (!user) {
      setUser(user);
    }
  }, [user]);
  if (!user) return null;
  return <div>info</div>;
}

export default Info;
