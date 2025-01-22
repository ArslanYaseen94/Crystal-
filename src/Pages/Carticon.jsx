import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Assuming you're using Material-UI
import styled, { keyframes } from "styled-components";

// Define the bounce animation using keyframes
const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(5);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Styled component for the container with bounce animation
const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  animation: ${bounceAnimation} 1.5s infinite ease-in-out;
`;

// Styled component for the icon
const CartIcon = styled(ShoppingCartIcon)`
  font-size: 24px;
  color: white; /* Icon color set to white */
`;

// Styled component for the text
const CartText = styled.span`
  font-size: 16px;
  color: white; /* Text color set to white */
  font-weight: bold;
`;

export const CartIcons = () => {
  return (
    <CartContainer>
      <CartIcon />
      <CartText>Cart</CartText>
    </CartContainer>
  );
};
