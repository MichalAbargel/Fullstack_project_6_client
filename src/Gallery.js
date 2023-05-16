import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const interval = 5;

  const getPhotos = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${interval}&_start=${photos.length}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setPhotos((photos) => [...photos, ...data]);
        console.log(data);
      }
    } catch (error) {
      throw error; //////////?
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} />
        </div>
      ))}
      <button onClick={getPhotos}>show more</button>
    </div>
  );
}

export default Gallery;
