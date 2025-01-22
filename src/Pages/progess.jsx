import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubmitButton(props) {
  const { name, pass } = props;
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef(undefined);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        if (name === "Arslan" && pass === "admin1234") {
          setTimeout(() => {
            toast.success("Login Successfully");
          }, 500);
          setTimeout(() => {
            navigate("/home");
          }, 1200);
        } else {
          navigate("/");
          toast.error("Login Failed");
        }
      }, 700);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          variant="contained"
          sx={{
            alignItems: "center",
            marginLeft: "70px",
            border: "2px solid orange",
            borderRadius: "4px 0px 0px 0px",
          }}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Submit
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "18px",
            }}
          />
        )}
      </Box>
      {/* Include ToastContainer in the render tree */}
      <ToastContainer />
    </Box>
  );
}
