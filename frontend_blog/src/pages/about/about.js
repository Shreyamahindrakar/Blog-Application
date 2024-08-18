// src/pages/About.js
import "./about.css";

export default function About() {
  return (
    <div className="about">
       <img
        className="aboutImage"
        src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="About Us"
      />
      <h1 className="aboutTitle">About Us</h1>
      
      <div className="aboutContentContainer">
        <div className="aboutContent">
          <p>
            Welcome to our blog application! We aim to provide a platform for users to share their stories, ideas, and experiences. Our team is dedicated to creating a seamless and engaging experience for everyone.
          </p>
          <p>
            Feel free to explore our features and get in touch with us if you have any questions or feedback. Thank you for visiting our site!
          </p>
        </div>
        
        <div className="imageGallery">
          <div className="imageBlock">
            <img
              src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Gallery Image 1"
            />
          </div>
          <div className="imageBlock">
            <img
              src="https://images.pexels.com/photos/534283/pexels-photo-534283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Gallery Image 2"
            />
          </div>
          <div className="imageBlock">
            <img
              src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Gallery Image 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
