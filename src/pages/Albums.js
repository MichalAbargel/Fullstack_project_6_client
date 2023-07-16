import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/albums.css";

function Albums() {
  const params = useParams();
  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    try {
      const response = await fetch(
        //`https://jsonplaceholder.typicode.com/albums/?userId=${params.userid}`
        `http://localhost:3500/api/alboms/${params.userid}`
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
      <div className="album-containor">
        {albums.map((album) => (
          <Link to={String(album.id)} key={album.id}>
            <div key={album.id} className="album" style={{ width: "18rem" }}>
              <h5 className="album-title">{album.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div>{handleAlbums()}</div>
    </div>
  );
}

export default Albums;
