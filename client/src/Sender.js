import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './Sender.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

const Sender = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, settext] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const url = 'http://localhost:8080/api/encrypt/' + text;
  const [secretKey,setSecretKey]=useState('');
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSecretKeyChange = (event) => {
    settext(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !text) {
      alert('Please select a file and enter a secret key.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Use the secretKey as part of the URL
      const response=await axios.post(url, formData);
      const secretKey=response.data.secretKey;
      setSecretKey(secretKey);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading and encrypting image:', error);
      // Handle errors and provide user feedback here
    }
  };
  const centerText = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
  };
  
  return (
    <div className="sender-container">
      <div>
        <Navbar>
        <div style={centerText}>
            <h1>Sender Interface</h1>
          </div>
          <Navbar.Collapse className="justify-content-end">
            <Link to={"/receiver"}>
              <Button className="hover-animation" variant="warning">
                Receiver Interface
              </Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <br></br><br></br>
      <div className="input-container">
        <input type="file" onChange={handleFileChange} />
        <br></br><br></br>
        <input
          type="text"
          placeholder="Enter Secret Key"
          value={text}
          onChange={handleSecretKeyChange}
        />
        <br></br>
        <br></br>
        <button onClick={handleUpload}>Upload and Encrypt Image</button>
        {uploadSuccess && (
          <div className="Message">

          <div >Image uploaded and encrypted successfully!</div>
          <div > Secret Key : {secretKey} </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sender;
