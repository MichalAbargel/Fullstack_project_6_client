import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const interval = 9;

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
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      }
    } catch (error) {
      throw error; //////////?
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="background">
      <div className="galary-containor">
        {photos.map((photo) => (
          <div key={photo.id} className="galary-item">
            <img
              className="rounded"
              src={photo.thumbnailUrl}
              alt={photo.title}
            />
          </div>
        ))}
      </div>
      <div className="text-center m-4">
        <button className="btn btn-primary" onClick={getPhotos}>
          Show More
        </button>
      </div>
    </div>
  );
}

export default Gallery;
