import React from "react";
import styled, { keyframes } from "styled-components";

// Animation for blinking text
const blink = keyframes`
  0% { opacity: 1; }
  25%{ opacity: 0; }
  50% { opacity: 1; }
  // 100% { opacity: 0; }
`;

// Styled-components for WhatsApp Button Container
const WhatsAppContainer = styled.div`
  position: fixed;
  bottom: 20px; /* Position from bottom */
  right: 20px;  /* Position from right */
  display: flex;
  align-items: center;
  z-index: 1000;
`;

// Styled-components for WhatsApp Button
const WhatsAppButton = styled.a`
  background-color: #25d366;
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-decoration: none;
  font-size: 30px;

  &:hover {
    background-color: #20c35e;
  }
`;

// Styled-components for Text
const BlinkingText = styled.span`
  margin-right: 10px; /* Space between text and icon */
  font-size: 16px;
  font-weight: bold;
  color: goldenrod;
  animation: ${blink} 1s infinite; /* Blinking effect */
`;

const WhatsAppIcon = () => {
  return (
    <WhatsAppContainer>
      {/* Text appears to the left of the icon */}
      <BlinkingText>Click here to order on WhatsApp!</BlinkingText>
      <WhatsAppButton
        href="https://wa.me/923006512804?text=Hi%20there!%20I%20have%20a%20question."
        target="_blank"
        title="Chat with us on WhatsApp"
      >
        &#x1F4AC; {/* Unicode for a speech bubble, replace with any icon */}
      </WhatsAppButton>
    </WhatsAppContainer>
  );
};

export default WhatsAppIcon;
