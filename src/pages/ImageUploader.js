import React, { useRef, useState } from "react";
import "../styles/ImageUploader.css";
import { useParams } from "react-router-dom";

function ImageUploader() {
  const params = useParams();
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("https://img.icons8.com/bubbles/100/000000/user.png");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      uploadImage(file);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    alert(JSON.stringify(formData));
    fetch(`http://localhost:3500/api/users/${params.userid}/uploadimg`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((blob) => {
        // יצירת URL מהתמונה בפורמט בינארי
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);

      })
      .catch((error) => {
        console.error("Error saving file:", error);
      });
  };
  

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="round-image">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <img
        src={imageSrc}
        alt="תמונה"
        onClick={handleImageClick}
        style={{ cursor: "pointer", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default ImageUploader;
