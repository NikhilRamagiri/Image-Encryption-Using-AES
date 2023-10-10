import React from 'react';
import { Link } from 'react-router-dom';
import Button from "./Button";
import "./App.css";

const Home = () => {
  const containerStyle = {
    backgroundColor: 'black',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const wb ={
    color:'white'
  };


  return (
    <div style={containerStyle}>
      <h1 style={wb}>Image Encryption using AES Algorithm</h1>

      
        <div>
          {/* Display the buttons when signed up or signed in */}
          <Link to="/sender">
            <Button name={"Sender"} className={"blue"} />
          </Link>

          <Link to="/receiver">
            <Button name={"Receiver"} className={"blue"} />
          </Link>
        </div>
    </div>
  );
};

export default Home;
