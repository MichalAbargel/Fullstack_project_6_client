import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Albums() {
  const params = useParams();
  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/?userId=${params.userid}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setAlbums(data);
        console.log(data);
      }
    } catch (error) {
      throw error; ///////////?
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  function handleAlbums() {
    return (
      <div>
        {albums.map((album) => (
          <Link to={String(album.id)} key={album.id}>
            <div>
              <p>{album.title}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>albums</h2>
      <div>{handleAlbums()}</div>
    </div>
  );
}

export default Albums;
