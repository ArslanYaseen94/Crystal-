import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// Styled components
const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const FormSection = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const SummarySection = styled.div`
  flex: 1;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #ff7a59;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff5233;
  }
`;

const PaymentOption = styled.div`
  margin: 10px 0;
`;

const StyledTotalPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const CheckoutPage = () => {
  function getRandomInt() {
    return Math.floor(Math.random() * (20000 - 10000)) + 10000;
  }
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
  var {
    cart = [],
    TotalQuantity = 0,
    TotalPrice = 0,
  } = useSelector((state) => state.Allstore || {});

  const form = useRef();
  function calculateCharge() {
    const currentMillis = new Date().getTime();
    const expirationTimeInMillis = currentMillis + 2592000000; // Expiration time in 30 days

    if (currentMillis >= expirationTimeInMillis) {
      // If expired
      return 250; // Apply charge when expired
    } else if (currentMillis <= expirationTimeInMillis) {
      if (TotalQuantity > 2) {
        // If within the valid period
        return 0; // No charge if within the valid time frame
      } else {
        return 250; // Apply charge when quantity is 1
      }
    }
  }

  const charge = calculateCharge();
  const sendEmail = (e) => {
    e.preventDefault();

    // Validate if all required fields are filled out
    if (
      !form.current.user_email.value ||
      !form.current.user_name.value ||
      !form.current.user_address.value
    ) {
      Swal.fire("All Field Is Required!");
      return;
    }

    // Create the cart items string
    const cartItemsString = cart
      .map((item) => `${item.name} - Quantity: ${item.qu || 0} price: ${item.price}  Quantity: ${item.qut}`)
      .join("____");
    const date = new Date();
    const date1 = date.toDateString(); // Current date as a string

    // Add 7 days to the current date
    const newDate = new Date(date); // Clone the original date to avoid modifying it
    newDate.setDate(newDate.getDate() + 7);

    const date2 = newDate.toDateString(); // New date as a string
    const templateParams = {
      user_email: form.current.user_email.value,
      user_name: form.current.user_name.value,
      userlast_name: form.current.userlast_name.value,
      user_address: form.current.user_address.value,
      user_phone: form.current.user_phone.value,
      user_city: form.current.user_city.value,
      user_postalcode: form.current.user_postalcode.value,
      user_2phone: form.current.user_2phone.value,
      TotalQuantity,
      charge: charge,
      TotalPrice: TotalPrice + charge,
      order_num: getRandomInt(),
      payment: form.current.payment.value,
      cart_items: cartItemsString,
      ship_Date: date2,

    };

    // Send the order confirmation email
    emailjs
      .send(
        "service_clks6kf", // Your Service ID
        "template_l3vqoih", // Your Template ID for Order Confirmation
        templateParams,
        "vcLkJdD3KjOCLrMu8" // Your Public Key
      )
      .then(
        (result) => {
          // Send the auto-reply email after the order confirmation
          emailjs
            .send(
              "service_clks6kf", // Same Service ID
              "template_bkghxnd", // Your Template ID for Auto Reply
              templateParams, // Same template parameters
              "vcLkJdD3KjOCLrMu8" // Your Public Key
            )
            .then(
              (autoReplyResult) => {
                generatePDF()
                Swal.fire({
                  title: "Thanks For Ordering",
                  text: "Order Has Been Successfully placed!",
                  icon: "success",
                });
              },
              (autoReplyError) => {
                Swal.fire({
                  title: "Error",
                  text: "Error while sending auto-reply!",
                  icon: "error",
                });
              }
            );
        },
        (error) => {
          Swal.fire({
            title: "Order",
            text: "Error While Placing Order!",
            icon: "error",
          });
        }
      );
  };

  return (
    <CheckoutContainer>
      <form ref={form} onSubmit={sendEmail}>
        <FormSection style={{ marginTop: "20px" }}>
          <SectionTitle style={{ textAlign: "center" }}>
            Personal Information
          </SectionTitle>
          <SectionTitle>Email</SectionTitle>
          <InputField
            type="email"
            placeholder="Email"
            name="user_email"
            autoFocus
          />
          <Label>
            <Checkbox type="checkbox" /> Email me with news and offers
          </Label>

          <SectionTitle>Delivery Details</SectionTitle>
          <InputField type="text" placeholder="First name" name="user_name" />
          <InputField
            type="text"
            placeholder="Last name"
            name="userlast_name"
          />
          <InputField
            type="text"
            placeholder="Complete address with landmark"
            name="user_address"
          />
          <InputField
            type="text"
            placeholder="Phone number"
            name="user_phone"
          />
          <InputField type="text" placeholder="City" name="user_city" />
          <InputField
            type="text"
            placeholder="Postal code"
            name="user_postalcode"
          />
          <InputField
            type="text"
            placeholder="Alternate phone number"
            name="user_2phone"
          />

          <SectionTitle>Payment</SectionTitle>
          <PaymentOption>
            <Checkbox type="radio" name="payment" value="Cash on Delivery" />{" "}
            Cash on Delivery (COD)
          </PaymentOption>
        </FormSection>

        <SummarySection>
          <SectionTitle>Order Summary</SectionTitle>
          <div>
            <p>Product:</p>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index}>
                  <p>
                    {"Name: "}
                    {item.name}
                    <span>
                      {"_"}Quantity: {item.qu}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p>No products in the cart</p>
            )}

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
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      <div>
                        {charge ? ("Shiping Charges") :("")}
                      </div>
                      
                      <span>
                        <div>
                          {charge === 0 ? (
                            <h5>
                              🎉 Hooray! Enjoy Free shipping on your order. No extra charges for delivery!
                            </h5>
                          ) : (
                            <p>{charge}</p>
                          )}
                        </div>
                      </span>
                    </li>
                    <div>
                      {
                        charge >1  ? ( "🚚 Shipping charges apply, but don't worry.we're here to help you with the best deals!"):("")
                      }
                    </div>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total Price</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>{TotalPrice + charge}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Button type="submit">Complete Order</Button>
        </SummarySection>
      </form>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
