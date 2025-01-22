import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for smooth scrolling animation
const scrollLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

// Styled Components
const MarqueeContainer = styled.div`
  overflow: hidden;
  position: relative;
  background: #222;
  border-radius: 10px;
  padding: 10px 0;
  width: 100vw; /* Full width of the viewport */
  margin: 0px auto;
  height: 50px; /* Fixed height */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MarqueeWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${scrollLeft} ${(props) => (props.isMobile ? "40s" : "25s")} linear infinite; /* Adjust speed */
`;

const MarqueeText = styled.div`
  color: #fff;
  font-size: ${(props) => (props.isMobile ? "1.4rem" : "1.5rem")}; /* Adjust font size for mobile */
  font-weight: bold;
  text-shadow: 1px 1px 2px #000;
  margin-right: 20px; /* Increased margin between texts */
`;

const Countdown = styled.span`
  color: ${(props) => (props.isExpired ? "red" : "#ffdd57")};
  font-weight: bold;
  margin-left: 5px;
`;

// Main Marquee Component
const Marquee = () => {
  const [daysLeft, setDaysLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [expirationTimeInMillis, setExpirationTimeInMillis] = useState(null); // Store expiration time in milliseconds
  const [isMobile, setIsMobile] = useState(false); // Check if the screen is mobile

  useEffect(() => {
    // Get current time in milliseconds
    const currentMillis = new Date().getTime();
    // Add 2,592,000,000 milliseconds (30 days)
    const endDateMillis = currentMillis + 2592000000; // 30 days in milliseconds

    setExpirationTimeInMillis(endDateMillis); // Store it directly in state

    // Check if the screen is mobile
    const checkMobile = window.innerWidth <= 768;
    setIsMobile(checkMobile); // Set the state based on window size
  }, []);

  useEffect(() => {
    // Only update countdown if expirationTimeInMillis is available
    if (expirationTimeInMillis === null) return;

    const updateCountdown = () => {
      // Get current time in milliseconds
      const currentMillis = new Date().getTime();

      // Check if the current time has passed the expiration time
      if (currentMillis >= expirationTimeInMillis) {
        setDaysLeft("Offer has expired!"); // Custom message for expired offer
        setIsExpired(true); // Set the flag to expired
        return;
      }

      // Calculate the time remaining
      const timeRemaining = expirationTimeInMillis - currentMillis; // Time remaining in milliseconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      setDaysLeft(`${days} days left`);
      setIsExpired(false);
    };

    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [expirationTimeInMillis]); // Run when expirationTimeInMillis changes

  return (
    <MarqueeContainer style={{ background: "#006999" }}>
      <MarqueeWrapper isMobile={isMobile}>
        <MarqueeText isMobile={isMobile}>🎉 Free Delivery on All Orders if Quantity is 3!</MarqueeText>
        <MarqueeText isMobile={isMobile} style={{ color: "#39FF14" }}>
          {isExpired ? (
            <Countdown isExpired={isExpired}>{daysLeft}</Countdown>
          ) : (
            <>
              📦 Offer valid until <Countdown isExpired={isExpired}><span style={{ color: "white" }}>{daysLeft}</span></Countdown>!
            </>
          )}
        </MarqueeText>
        <MarqueeText isMobile={isMobile}>🚚 Don't miss out!</MarqueeText>
      </MarqueeWrapper>
    </MarqueeContainer>
  );
};

export default Marquee;
