import { useState, useEffect } from "react";
import mapImage from "../../assets/images/map-ui.png";
import "./ContactUs.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Initialize animations
    const animatePins = () => {
      const pins = document.querySelectorAll(".map-pin");
      pins.forEach((pin, index) => {
        setTimeout(() => {
          pin.classList.add("pulse");
          setTimeout(() => pin.classList.remove("pulse"), 1000);
        }, index * 300);
      });
    };

    // Run pin animation periodically
    animatePins();
    const interval = setInterval(animatePins, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div
      id="contact_us"
      className={`contact-container  ${isLoaded ? "loaded" : ""}`}
    >
      <div className="contact-inner 2xl:py-16 py-12 container ">
        <div className="contact-form-section">
          <div className="contact-header">
            <h3>CONTACT US</h3>
            <h2>GET IN TOUCH</h2>
            <p>
              Lost get directions with our map feature. Use the locator to find
              most all events.
            </p>
          </div>

          <div className="contact-form">
            <div className="md:flex md:flex-row flex-col md:gap-3">
              {" "}
              <div className="form-group md:w-[50%]">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group md:w-[50%]">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="email">Your Email</label>
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="subject">Subject</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="message">Write Message</label>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="custom-button-two"
            >
              SEND MESSAGE
            </button>
          </div>
        </div>

        <div className="max-w-full lg:block hidden">
          <img src={mapImage} alt="Map image" />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
