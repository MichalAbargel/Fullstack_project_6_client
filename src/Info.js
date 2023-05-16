import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Info() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setUser(data.filter((user) => user.id == params.userid)[0]);
      }
    } catch (error) {
      throw error; ///////////////////?
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return <div>loading...</div>;
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>
        Address: {user.address.street}, {user.address.suite},{" "}
        {user.address.city}, {user.address.zipcode}
      </p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <h2>Company: {user.company.name}</h2>
      <p>Catchphrase: {user.company.catchPhrase}</p>
      <p>BS: {user.company.bs}</p>
    </div>
  );
}

export default Info;
