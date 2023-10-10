import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Receiver.css'; // Import the Receiver.css file
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

const Receiver = () => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  // eslint-disable-next-line
  const [secretKey, setSecretKey] = useState('');

  // Fetch the list of image filenames from your server
  useEffect(() => {
    axios.get('http://localhost:8080/api/getImageList') // Create this API endpoint on your server to fetch image filenames
      .then((response) => {
        setImageList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching image list:', error);
      });
  }, []);

  const handleImageSelect = (event) => {
    const selectedFilename = event.target.value;

    // Prompt the user to enter the secret key
    const inputKey = prompt('Enter the secret key:');

    // Decrypt the selected image using the secret key
    axios.get(`http://localhost:8080/api/decrypt/${selectedFilename}/${inputKey}`, {
      responseType: 'arraybuffer', // Receive response as an ArrayBuffer
    })
      .then((response) => {
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: 'image/jpeg' }); // Change the type as needed

        // Create a URL for the Blob and set it as the selected image
        const imageUrl = URL.createObjectURL(blob);
        setSelectedImage(imageUrl);
      })
      .catch((error) => {
        console.error('Error decrypting and displaying image:', error);
        alert('Invalid secret key or error decrypting image.');
      });
  };
  const centerText = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
  };

  return (
    <div className="receiver-container"> {/* Apply the CSS class here */}
      <div>
        <Navbar>
          <div style={centerText}>
            <h1>Receiver Interface</h1>
          </div>
          <Navbar.Collapse className="justify-content-end">
            <Link to={"/sender"}>
              <Button className="hover-animation" variant="warning">
                Sender Interface
              </Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <br></br><br></br>
      <select onChange={handleImageSelect}>
        <option value="">Select an image</option>
        {imageList.map((filename) => (
          <option key={filename} value={filename}>
            {filename}
          </option>
        ))}
      </select>
      <br />
      <br />
      {selectedImage && (
        <div className='Display'>
          <h3>Decrypted Image</h3>
          <br></br>
          <img src={selectedImage} alt="Decrypted" />
        </div>
      )}
      <br></br>
    </div>
  );
};

export default Receiver;
