import React, { useState } from "react";
import "./App.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";


const Sender = () => {
  const [image, setImage] = useState(null);
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState("");
  // eslint-disable-next-line
  const [progress, setProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const imageRef = ref(storage, `images/${image.name}`);

    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
          setUploadSuccess(true); // Set upload success to true
          // You can use the alert function or a custom alert component here
          alert("Image uploaded successfully!");
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setUploadSuccess(false);
        // Handle the error and show an error message if needed
        alert("Error uploading image. Please try again.");
      });
  };

  return (
    <div>
      <br></br>
      <h1>Upload Image to Cloud Firebase Storage</h1>
      <br></br><br></br>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      
      {progress > 0 && <progress value={progress} max="100" />}
      <br></br>
      {uploadSuccess && (
        <div style={{ color: "green" }}>Image uploaded successfully!</div>
      )}
    </div>
  );
};

export default Sender;
