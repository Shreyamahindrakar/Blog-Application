// src/pages/Contact.js
import "./contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <img
        className="contactImage"
        src="https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Contact Us"
      />
      <h1 className="contactTitle">Contact Us</h1>
      
      <div className="contactContentContainer">
        <div className="contactInfo">
          <h2>Get in Touch</h2>
          <p>
            We would love to hear from you! Feel free to reach out to us with any questions, comments, or feedback.
          </p>
          <p>
            <strong>Email:</strong> support@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (234) 567-8901
          </p>
        </div>

        <div className="contactForm">
          <h2>Send Us a Message</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />
            
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
            
            <button type="submit" className="contactSubmitButton">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
