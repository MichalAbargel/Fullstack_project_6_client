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
    <div className="album-containor">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {photos.map((photo) => (
              <div className="col mb-4" key={photo.id}>
                <img
                  src={photo.thumbnailUrl}
                  className="rounded img-fluid"
                  alt={photo.title}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={getPhotos}>
          Show More
        </button>
      </div>
    </div>
  );
}

export default Gallery;
