import { useDispatch, useSelector } from "react-redux";
import "mdb-ui-kit/css/mdb.min.css";
import { useState } from "react";
import { addtofavourite, addvalue, subvalue, itemremove } from "../store/slice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./FinalCheckout";
import { Navigate, useNavigate } from "react-router-dom";
// import { image } from "html2canvas/dist/types/css/types/image";

export const Cart = () => {
  const [valuedish, setDishvalue] = useState(0);
  const { cart, TotalQuantity, TotalPrice } = useSelector(
    (state) => state.Allstore
  );

  const dispatch = useDispatch();
  const date = new Date();
  const date1 = date.toDateString(); // Current date as a string
  
  // Add 7 days to the current date
  const newDate = new Date(date); // Clone the original date to avoid modifying it
  newDate.setDate(newDate.getDate() + 7);
  
  const date2 = newDate.toDateString(); // New date as a string
  const navigate = useNavigate();
  const handlefavourite = (e, x) => {
    e.stopPropagation();
    dispatch(addtofavourite(x));
  };

  const handleaddvalue = (x) => {
    dispatch(addvalue(x));
  };

  const handledelte = (x) => {
    dispatch(itemremove(x));
  };

  // Function to generate the PDF
  const generatePDF = async () => {
    const doc = new jsPDF();
    let yPosition = 20;

    doc.setFontSize(18);
    doc.text("Checkout Summary", 10, yPosition);
    yPosition += 20;
    // xPosition += 10;

    for (let index = 0; index < cart.length; index++) {
      const item = cart[index];

      // Add item details
      doc.setFontSize(12);
      doc.text(`Item ${index + 1}: ${item.name}`, 10, yPosition);
      yPosition += 10;

      doc.text(`Price: ${item.price} Rs`, 10, yPosition);
      yPosition += 10;

      doc.text(`Quantity: ${item.qu}`, 10, yPosition);
      yPosition += 10;

      // Wait for the image to load
      const imgElement = document.querySelector(`#item-img-${index}`);
      if (imgElement.complete) {
        const canvas = await html2canvas(imgElement);
        const imgData = canvas.toDataURL("image/png");

        // Add the image to the PDF (100% width of the PDF page)
        const pdfWidth = doc.internal.pageSize.getWidth() - 20; // Subtract 20 for margin
        const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
        doc.addImage(imgData, "PNG", 10, yPosition, pdfWidth, imgHeight);
        yPosition += imgHeight + 10;
      }

      // Adjust the yPosition for the next item
      if (yPosition > doc.internal.pageSize.getHeight() - 30) {
        doc.addPage(); // Add a new page if the content exceeds the current page height
        yPosition = 20;
      }
    }

    // Final total price at the end
    doc.setFontSize(16);
    doc.text(`Total Price: ${TotalPrice} Rs`, 10, yPosition);
    doc.save("checkout.pdf");

    // Trigger the toast after PDF generation
    toast.success("🔗Bill PDF is Generated");
  };

  if (cart.length <= 0) {
    return (
      <h1 style={{ textAlign: "center", fontSize: "100px", marginTop: "60px" }}>
        <div
          style={{
            marginTop: "58px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
        </div>
        <div style={{fontSize:"50px"}}>
            <img src="/image/empty.webp" alt="" /> 
          <div>🤦‍♀️oh ho!Basket is Empty</div>
          <div>plz fill this with items 👀</div>
        </div>
      </h1>
    );
  } else
    return (
      <div>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0" style={{ color: "goldenrod" }}>
                      Cart {cart.length} items
                    </h5>
                  </div>
                  <div className="card-body">
                    {cart.map((x, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                id={`item-img-${index}`}
                                src={x.img}
                                className="w-100"
                                alt={`Img`}
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor:
                                      " rgba(251, 251, 251, 0.2)",
                                  }}
                                ></div>
                              </a>
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>{x.name}</strong>
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-1 mb-2"
                              onClick={() => {
                                handledelte(x);
                              }}
                              style={{
                                backgroundColor: "goldenrod",
                                color: "white",
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm mb-2"
                              onClick={(e) => handlefavourite(e, x)}
                              style={{
                                backgroundColor: "goldenrod",
                                color: "white",
                              }}
                            >
                              <i className="fas fa-heart"></i>
                            </button>
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn btn-primary px-3 me-2"
                                style={{
                                  backgroundColor: "goldenrod",
                                  color: "white",
                                }}
                                onClick={() => {
                                  dispatch(subvalue(x));
                                }}
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <div className="form-outline">
                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={x.qu}
                                  type="number"
                                  className="form-control"
                                />
                              </div>

                              <button
                                className="btn btn-primary px-3 ms-2"
                                style={{
                                  backgroundColor: "goldenrod",
                                  color: "white",
                                }}
                                onClick={() => {
                                  handleaddvalue(x);
                                }}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>

                            <p className="text-start text-md-center">
                              <strong>Price:</strong>
                              <strong>{x.price}Rs</strong>
                            </p>
                          </div>
                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <p>
                      <strong>Expected shipping delivery</strong>
                    </p>
                    <p className="mb-0">{date1} - {date2}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0" style={{ color: "goldenrod" }}>
                      Summary
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Total Quantity
                        <span>{TotalQuantity}</span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total Price</strong>
                          <strong>
                            <p className="mb-0">(including VAT)</p>
                          </strong>
                        </div>
                        <span>
                          <strong>{TotalPrice}</strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                      style={{ backgroundColor: "goldenrod", color: "white" }}
                      onClick={() => {
                        // generatePDF()
                        navigate("/finalcheckout");
                      }}
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer
          position="top-center"
          autoClose={1190}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          // transition:"" Bounce",
        />
      </div>
    );
};
