import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Tooltip,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import data from "../api/data.json";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, Unfavourite } from "../store/slice";
export function Favorite() {
  const Data = useSelector((state) => state.Allstore.Favourite);
  console.log(Data);

  const dispatch = useDispatch();
  const date = new Date().toDateString();

  // State to manage dialog visibility and selected item
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  // Hook to detect if the screen width is 600px or less
  const isMobile = useMediaQuery("(max-width:600px)");

  // Function to open the dialog with selected item data
  const handleOpenDialog = (item) => {
    setSelectedItem(item); // Set the selected item
    setOpen(true); // Open the dialog
  };
  const handletoast = () => {
    toast.success("Add To Cart Successfully");
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
    setSelectedItem(null); // Clear the selected item
  };
  // Handle share dialog opening
  const handleShareDialog = (item, e) => {
    e.stopPropagation();
    const link = `${window.location.origin}/home/menu/${item.id}`; // Example of a shareable link
    setShareLink(link);
    setShareOpen(true);
  };

  // Handle close share dialog
  const handleCloseShareDialog = () => {
    setShareOpen(false);
    setShareLink("");
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };
  const searchdata = Data.filter((CurrentDish) =>
    CurrentDish.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleunfavourite = (e, x) => {
    e.stopPropagation();
    toast.success("Remove From Favourite Successfully");
    dispatch(Unfavourite(x));
  };
  if (Data.length <= 0) {
    return <h1 className="favmobile">Your favorites list is empty. Start adding items💖!</h1>;
  } else
    return (
      <div style={{ marginBottom: "20px" }}>
        <input
          type="search"
          placeholder="Search Your Favourite Cosmetic"
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mobileversion" style={{ marginTop: "20px" }}>
          {searchdata.map((x) => {
            return (
              <Card
                sx={{ maxWidth: 345 }}
                key={x.id}
                onClick={() => handleOpenDialog(x)} // Open dialog on card click
                className="hov"
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
                      {x.Nam}
                    </Avatar>
                  }
                  title={`${x.name}`}
                  subheader={`${date}`}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={x.img}
                  alt="Paella dish"
                />
                <CardContent>
                  <Divider> Price - {x.price}</Divider>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {x.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Tooltip title="It's Your Favourite">
                    <IconButton
                      aria-label="add to favorites"
                      onClick={(e) => {
                        handleunfavourite(e, x);
                      }}
                    >
                      <FavoriteIcon className="fav" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton
                      aria-label="share"
                      onClick={(e) => handleShareDialog(x, e)}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            );
          })}
        </div>

        {/* Responsive Dialog */}
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          fullWidth={true} // Full width for better mobile experience
          maxWidth={isMobile ? "xs" : "md"} // If mobile screen, set dialog width to 'xs', else 'md'
          PaperProps={{
            sx: {
              height: isMobile ? "90vh" : "80vh", // 90% height on mobile, 80% otherwise
              padding: isMobile ? "10px" : "20px", // Extra padding on mobile for better spacing
            },
          }}
        >
          <DialogTitle>{selectedItem?.name}</DialogTitle>
          <DialogContent>
            {selectedItem && (
              <>
                <img
                  src={selectedItem.img}
                  alt={selectedItem.name}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Price: {selectedItem.price}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {selectedItem.description}
                </Typography>
              </>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  borderLeft: "none",
                  borderRight: "none",
                  borderTop: "none",
                  borderRadius: "15px",
                  height: "50px",
                  width: "120px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(addtocart(selectedItem));
                  handletoast()
                }}
                className="cartbtn"
              >
                Add to Cart
              </button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Dialog for Share Link */}
        <Dialog
          open={shareOpen}
          onClose={handleCloseShareDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Share Link</DialogTitle>
          <DialogContent>
            <TextField
              value={shareLink}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={copyToClipboard}
            >
              Copy Link
            </Button>
          </DialogContent>
        </Dialog>
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
      </div>
    );
}
