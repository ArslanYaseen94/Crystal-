import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the scrolling animation
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
`;

// Styled component for the marquee container
const Marquee = styled.div`
  --duration: 20s;
  --gap: 2rem;

  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
`;

// Styled component for each marquee group
const MarqueeGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
  animation: ${scroll} var(--duration) linear infinite;
`;

// Styled component for the text
const MarqueeText = styled.p`
  font-family: "Corben", system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;

  background-image: linear-gradient(
    75deg,
    hsl(240deg 70% 49%) 0%,
    hsl(253deg 70% 49%) 11%,
    hsl(267deg 70% 49%) 22%,
    hsl(280deg 71% 48%) 33%,
    hsl(293deg 71% 48%) 44%,
    hsl(307deg 71% 48%) 56%,
    hsl(320deg 71% 48%) 67%,
    hsl(333deg 72% 48%) 78%,
    hsl(347deg 72% 48%) 89%,
    hsl(0deg 73% 47%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// Main Component
const FreeDeliveryBanner = () => {
  return (
    <Marquee style={{marginTop: "25px"}}>
      {/* First marquee group */}
      <MarqueeGroup>
      <MarqueeText>🚚 Free Delivery till 1st Feb! 🚚</MarqueeText>
        <MarqueeText>💸 Shop Now and Save More! 💸</MarqueeText>
        <MarqueeText>🔥 Don't Miss Out! 🔥</MarqueeText>
        <MarqueeText>⏳ Limited Time Offer! ⏳</MarqueeText>
        <MarqueeText>🎉 Free Delivery on orders of 3 items!</MarqueeText>
        
      </MarqueeGroup>

      {/* Second marquee group for seamless scrolling
      <MarqueeGroup aria-hidden="true">
        <MarqueeText>Free Delivery till 1st Feb!</MarqueeText>
        <MarqueeText>Shop Now and Save More!</MarqueeText>
        <MarqueeText>Don't Miss Out!</MarqueeText>
        <MarqueeText>Limited Time Offer!</MarqueeText>
      </MarqueeGroup> */}
    </Marquee>
  );
};


export default FreeDeliveryBanner;