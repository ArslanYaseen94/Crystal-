import React, { useState } from "react";
import "../aboutstyle.css"; // Import the CSS file for styling
import { TypeAnimation } from "react-type-animation";

export const About = () => {
  const [typingStatus, setTypingStatus] = useState("Initializing");

  return (
    <div className="about-section" style={{marginTop:"70px"}}>
      <div className="about-overlay">
        <div className="about-content">
          <h1 className="about-title">Welcome to</h1>
          <TypeAnimation
            sequence={[
              1500,
              () => {
                setTypingStatus("Typing...");
              },
              "The World of Crystal", // Text to type
              () => {
                setTypingStatus("Done Typing");
              },
            ]}
            style={{ fontSize: "2em", color: "white" }}
          />

          <p className="about-description">
            <TypeAnimation
              splitter={(str) => str.split(/(?= )/)} // Split the text on spaces
              sequence={[
                "Crystal Cosmetics is a renowned brand known for its high-quality beauty and skincare products. The company offers a wide range of cosmetics, including makeup, skincare, hair, and personal care items, designed to cater to diverse customer needs. With a focus on innovation, Crystal Cosmetics blends luxury with affordability, ensuring that every product enhances natural beauty.",
                3000, // Delay before completing
              ]}
              speed={{ type: "keyStrokeDelayInMs", value: 50 }} // Slower speed for smoother typing
              omitDeletionAnimation={false} // Ensure deletion animation occurs
              style={{ fontSize: "1em", display: "block", minHeight: "200px" }}
              repeat={false} // Disable repetition
            />
          </p>
          <p>
            The brand is committed to using skin-friendly ingredients, offering
            solutions that are both effective and gentle. Crystal Cosmetics is
            dedicated to promoting self-confidence and empowerment through its
            products, making beauty accessible to everyone. Its products are
            available globally, with a strong presence in both physical and
            online stores.
          </p>
        </div>
      </div>
    </div>
  );
};
