import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../api/data.json";
import { useDispatch } from "react-redux";
import { addtocart } from "../store/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductReviewsAndFAQs from "./review";

export const CardDetail = () => {
  const { id } = useParams(); // Get the ID from the route parameters
  const product = data.find((item) => item.id === parseInt(id)); // Find the product by ID

  if (!product) {
    return <h2>Product not found!</h2>; // Handle invalid ID
  }

  const { title, price, des, img, ing, feature, qut,use } = product;
  const dispatch = useDispatch();
  const handletoast = () => {
    toast.success("Product added to cart!");
  };
  const navigate = useNavigate();
  const handletofinalcheckout = () => {
    navigate("/finalcheckout");
  };
  return (
    <>
      <div className="container">
        {/* Top Section: Image */}
        <div className="imageSection">
          <img src={img} alt={title} className="productImage" />
        </div>

        {/* Bottom Section: Details */}
        <div className="detailsSection">
          <h2 className="productTitle">{title}</h2>
          <p className="productPrice">Rs.{price.toFixed(2)}</p>
          <h6 style={{color:"green"}}>{ price ? "In stock:stock" :"In stock:not in stock"}</h6>
          <p className="Quantity">{qut}</p>
          <div className="tags">
            <p>✅ 10,000+ Verified Reviews</p>
            <p>🚚 Ready to Ship - Worldwide</p>
            <p>🔄 Easy Returns & Exchanges</p>
            <p>🔒 Safe & Secure Checkout</p>
          </div>
          <div className="buttons">
            <button
              disabled={price === 0}
              className={`addToCart ${price === 0 ? "disabled" : ""}`}
              onClick={() => {
                console.log(product);
                dispatch(addtocart(product));
                handletoast();
              }}
            >
              Add to Cart
            </button>
            <button
              disabled={price === 0}
              className={`buyNow ${price === 0 ? "disabled" : ""}`}
              onClick={() => {
                console.log(product);
                dispatch(addtocart(product));
                handletofinalcheckout();
              }}
            >
              Buy It Now
            </button>
          </div>
          <div className="productInfo">
            <h4>Ingredients:</h4>
            <p>{ing}</p>
          </div>
          <div className="productInfo">
            <h4>How To Use:</h4>
            <p>
              {use}
            </p>
          </div>
          <div className="productInfo">
            <h4>Feature:</h4>
            <p>{feature}</p>
          </div>
        </div>
        <ToastContainer />
      </div>
      <ProductReviewsAndFAQs />
    </>
  );
};

// CSS Styling
const styles = `
  .container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    font-family: Arial, sans-serif;
  }
  .imageSection {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .productImage {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .detailsSection {
    flex: 1.5;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .productTitle {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
  }
  .productPrice {
    font-size: 24px;
    font-weight: bold;
    color: #007b00;
    margin-bottom: 20px;
  }
  .tags {
    margin-bottom: 20px;
    font-size: 14px;
    color: #555;
    line-height: 1.8;
  }
  .buttons {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  .addToCart,
  .buyNow {
    padding: 10px 25px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .addToCart {
    background-color: #000;
    color: #fff;
  }
  .buyNow {
    background-color: #ffa500;
    color: #fff;
  }
  .addToCart:hover {
    background-color: #333;
    color: #ffcc00;
    transform: scale(1.05);
    transition: all 500ms;
  }
  .buyNow:hover {
    background-color: #e69500;
    color: #000;
    transform: scale(1.05);
    transition: all 500ms;
  }
  .disabled {
    background-color: #ccc !important;
    color: #666 !important;
    cursor: not-allowed !important;
    transform: none !important;
  }
  .productInfo {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    color: #444;
  }

  /* Responsive Design for Mobile Devices */
  @media (max-width: 600px) {
    .container {
      flex-direction: column;
      padding: 20px;
      gap: 10px;
      margin-top: 20px;
    }
    .imageSection {
      margin-bottom: 20px;
    }
    .productImage {
      width: 100%;
      max-width: none;
      border-radius: 6px;
    }
    .detailsSection {
      padding: 15px;
    }
    .productTitle {
      font-size: 20px;
    }
    .productPrice {
      font-size: 18px;
    }
    .buttons {
      flex-direction: column;
      gap: 10px;
    }
    .addToCart,
    .buyNow {
      width: 100%;
    }
    .productInfo {
      font-size: 14px;
    }
  }
`;

export default CardDetail;

// Adding CSS Styles to the Document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
