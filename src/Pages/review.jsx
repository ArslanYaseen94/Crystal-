import React, { useState, useEffect } from "react";

const ProductReviewsAndFAQs = () => {
  const reviews = [
        { id: 1, name: "Fatima", stars: 5, review: "Amazing product! My hair feels healthier and smells fantastic." },
        { id: 2, name: "Hira", stars: 4, review: "Great quality, but it took a while to show results." },
        { id: 3, name: "Amal", stars: 3, review: "Decent product, but I expected better for the price." },
        { id: 4, name: "Alina", stars: 5, review: "Absolutely fantastic! My hair has never felt this smooth before." },
        { id: 5, name: "Areesha", stars: 4, review: "Good product, though I wish the scent was milder." },
        { id: 6, name: "Nasreen Beghum", stars: 4, review: "Softens hair well, but the packaging could be improved." },
        { id: 7, name: "Nabeela", stars: 4, review: "Leaves my hair shiny and manageable, though a bit pricey." },
        { id: 8, name: "Kiran", stars: 4, review: "Great for everyday use, but the bottle size could be larger." },
        { id: 9, name: "Nimra", stars: 5, review: "The best hair product I've ever used! Love how my hair feels silky." },
        { id: 10, name: "Shazia", stars: 3, review: "It's okay, but I wish it was more effective for dry hair." },
        { id: 11, name: "Zara", stars: 3, review: "Overall Exprience is Good 💖." }
  ];

  const faqs = [
    { id: 1, question: "Is this product suitable for all hair types?", answer: "Yes, this product is formulated to be suitable for all hair types." },
    { id: 2, question: "Does it contain any sulfates?", answer: "No, the product is free from harmful sulfates." },
    { id: 3, question: "Can I use this daily?", answer: "Yes, the gentle formula makes it ideal for daily use." },
    { id: 4, question: "Is it safe for colored hair?", answer: "Yes, the product is safe for colored and treated hair." },
    { id: 5, question: "What is the shelf life of this product?", answer: "The shelf life is 24 months from the date of manufacture." }
  ];

  const [scrolling, setScrolling] = useState(true);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    let scrollInterval;
    if (scrolling) {
      scrollInterval = setInterval(() => {
        const container = document.getElementById("reviews-container");
        if (container) {
          container.scrollLeft += 1;
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
          }
        }
      }, 20);
    }
    return () => clearInterval(scrollInterval);
  }, [scrolling]);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" }}>
      {/* Customer Reviews */}
      <h2 style={{ textAlign: "center" }}>Customer Reviews</h2>
      <div
        id="reviews-container"
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#fff",
          cursor: "pointer"
        }}
        onMouseEnter={() => setScrolling(false)}
        onMouseLeave={() => setScrolling(true)}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              flex: "0 0 auto",
              width: "200px",
              margin: "0 10px",
              textAlign: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#f5f5f5",
              wordWrap: "break-word",
              whiteSpace: "normal"
            }}
          >
            <h4 style={{color:"goldenrod"}}>{review.name}</h4>
            <div style={{ color: "#FFD700" }}>{"★".repeat(review.stars) + "☆".repeat(5 - review.stars)}</div>
            <p style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{review.review}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>FAQs</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {faqs.map((faq) => (
          <div
            key={faq.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff"
            }}
          >
            <h4
              onClick={() => toggleFAQ(faq.id)}
              style={{ cursor: "pointer", color: "goldenrod" }}
            >
              {faq.question}
            </h4>
            {openFAQ === faq.id && <p style={{ marginTop: "10px", color: "#555" }}>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsAndFAQs;
