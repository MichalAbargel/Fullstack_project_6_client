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

  function open(e) {
    const overlay = document.querySelector('.overlay');
    const overlayImage = document.querySelector('.overlay__inner img');
    overlay.classList.add('open');
    console.log(e.currentTarget.parentNode);
    //const src= e.currentTarget.querySelector('.project__image').src;
    //overlayImage.src = src;
  }
  
  function close() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('open');
  }

  return (
    <section id="portfolio">
      {photos.map((photo) => (
        <div key={photo.id} className="project">
          <img className="project__image" src={photo.url} />
          <p>websites</p>
          <h3 className="grid__title"> front-end</h3>
          <div className="grid__overlay">
            <button className="viewbutton" onClick={(e)=>{open(e)}}>full size</button>
          </div>
      </div>
      ))}
      <div className="overlay">
        <div className="overlay__inner">
          <button className="close" onClick={(e)=>{close(e)}}>close X</button>
          <img/>
        </div>
      </div>
      <button onClick={getPhotos}>show more</button>
    </section>
  );
}

export default Gallery;
