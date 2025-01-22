import React, { useState } from "react";
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import "../contactstyle1.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "./email";
export function Contact() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [check, setcheck] = useState(false);
  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };
  const handlesendcopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (check) {
      toast.success("A copy has been Sent To Your Gmail");
    }
  };
  const handlecheck = () => {
    setcheck(true);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <form
        id="form"
        className="text-center"
        style={{ width: "100%", maxWidth: "300px" }}
      >
        <h2 style={{ color: "goldenrod" }}>Contact us</h2>

        <MDBInput
          label="Name"
          wrapperClass="mb-4"
          onFocus={() => handleFocus("name")}
          onBlur={handleBlur}
          style={{ borderColor: focusedInput === "name" ? "goldenrod" : "" }}
        />

        <MDBInput
          type="email"
          label="Email address"
          wrapperClass="mb-4"
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          style={{ borderColor: focusedInput === "email" ? "goldenrod" : "" }}
        />

        <MDBInput
          label="Subject"
          wrapperClass="mb-4"
          onFocus={() => handleFocus("subject")}
          onBlur={handleBlur}
          style={{ borderColor: focusedInput === "subject" ? "goldenrod" : "" }}
        />

        <MDBTextArea
          wrapperClass="mb-4"
          label="Message"
          onFocus={() => handleFocus("message")}
          onBlur={handleBlur}
          style={{ borderColor: focusedInput === "message" ? "goldenrod" : "" }}
        />

        <MDBCheckbox
          wrapperClass="d-flex justify-content-center"
          label="Send me copy"
          style={{ backgroundColor: "goldenrod" }}
          value={check}
          onChange={() => {
            handlecheck();
          }}
        />

        <MDBBtn
          color="primary"
          block
          className="my-4"
          style={{ backgroundColor: "goldenrod" }}
        >
          <button
            onClick={(e) => {
              handlesendcopy(e);
            }}
            style={{ background: "none", border: "none", fontSize: "15px" }}
          >
            Send
          </button>
        </MDBBtn>
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
          // transition=" Bounce"
        />
      </form>
    </div>
  );
}
