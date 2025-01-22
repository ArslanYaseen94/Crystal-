import React, { useState, useEffect } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
console.log(images);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div style={styles.sliderContainer}>
      <div
        style={{
          ...styles.slider,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} style={styles.slide}>
            <img src={image} alt={`Slide ${index}`} style={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    width: "100%",
    maxWidth: "100%",
    margin: "0 auto",
    marginTop: "0px",
    overflow: "hidden",
    borderRadius: "10px",
    border: "2px solid #ccc",
    height: "200px", // Set container height to 150px
  },
  slider: {
    display: "flex",
    transition: "transform 0.5s ease-in-out", // Smooth sliding effect
    width: "100%",
  },
  slide: {
    minWidth: "100%",
    boxSizing: "border-box",
  },
  image: {
    width: "100%",
    height: "200px", // Set image height to 150px
    objectFit: "fit", // This will crop the image to fit the container without distortion
    display: "block",
  },
};

export default ImageSlider;
