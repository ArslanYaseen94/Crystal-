import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";  
import CardActions from "@mui/material/CardActions";
import style from "../menu.module.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LoadingSkeleton } from "./skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import  WhatsAppButton  from "./whatsapp";
import img1 from "/image/1s.jpg"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Tooltip,
  useMediaQuery,
  Button,
  TextField, // Make sure TextField is imported here
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, addtofavourite } from "../store/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "/image/bc12.jpg";
import Marquee from "./Marquee";
import { useNavigate } from "react-router-dom";
import ProductReviewsAndFAQs from "./review";
import FreeDeliveryBanner from "./freedelivery";
import ImageSlider from "./slider";
export function Menu() {
  const Data = useSelector((state) => state.Allstore.items);
  const dispatch = useDispatch();
  const date = new Date().toDateString();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [load, setloading] = useState(true);
  // const [visit, setvisited] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const handletoast = () => {
    toast.success("Add To Cart Successfully");
  };

  // const handleOpenDialog = (item) => {
  //   setSelectedItem(item);
  //   setOpen(true);
  // };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handlefavourite = (e, x) => {
    e.stopPropagation();
    dispatch(addtofavourite(x));
    toast.success("Add To Favourites Successfully");
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
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, []);
  const navigate=useNavigate()
  const images = [
    `/image/1s.jpg`,  // Path relative to the public folder
    "/image/4s.jpg",
    "/image/2s.jpg",
    "/image/3s.jpg",
  ];
  
  return (
    <div style={{ backgroundImage: `url(${Banner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', height: 'auto' }}>
  {/* Your content */}

      {load ? (
        <div>{<LoadingSkeleton />}</div>
      ) : (
        <div style={{ marginBottom: "30px" }}>
          {/* <div><Marquee/></div> 
           */}
           <ImageSlider  images={images}/>  
           <FreeDeliveryBanner/>
          <input
            type="search"
            placeholder="Search Your Cosmetic"
            className="search"
            // style={{marginLeft:"39 px"}}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="mobileversion">
            {searchdata.map((x) => {
              return (
                <Card
                  sx={{ maxWidth: 345 }}
                  key={x.id}
                  onClick={() => navigate(`/home/menu/${x.id}`)}
                  className="hov"
                  style={{ marginTop: "19px", marginLeft: "23px",backgroundColor:"white" }}
                >
                  <CardHeader
                  style={{height: "60px",marginTop: "30px",marginLeft: "-20px",fontSize: "10px"}}
                      avatar={
                        <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
                          {x.Nam}
                        </Avatar>
                      }
                    // action={
                    //   // <IconButton aria-label="settings">
                    //   //   <MoreVertIcon />
                    //   // </IconButton>
                    // }
                    title={`${x.name}`}
                    // subheader={`${date}`}
                  />
                  <div class="card">
                    <div
                      style={{ alignItems: "center" }}
                      class="card-image-container"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%", // Ensure the parent container takes full height
                          width: "100%", // Ensure the parent container takes full width
                        }}
                      >
                        <img
                          style={{
                            height: "100%", // Image height
                            width: "100%" // Image wid // Ensure the image behaves as a block element
                          }}
                          alt="My Image"
                          src={x.img} // The image to load
                          effect="blur" // Optional blur effect while loading
                        />
                      </div>
                    </div>
                  </div>

                  {/* <CardMedia
                      component="img"
                      height="194"
                      image={x.img}
                      alt="Paella dish"
                    /> */}
                  <CardContent>
                    <Divider> Price - {x.price}</Divider>
                    <Divider>{x.qut}</Divider>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {x.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Tooltip title="Add To Favourite">
                      <IconButton
                        aria-label="add to favorites"
                        className="heart"
                      >
                        <FavoriteIcon onClick={(e) => handlefavourite(e, x)} />
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

          {/* Dialog for Item Details */}
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            fullWidth={true}
            maxWidth={isMobile ? "xs" : "md"}
            PaperProps={{
              sx: {
                height: isMobile ? "90vh" : "80vh",
                padding: isMobile ? "10px" : "20px",
              },
            }}
          >
            <DialogTitle style={{backgroundColor:"ButtonShadow"}}>{selectedItem?.name}</DialogTitle>
            <p>{selectedItem?.des}</p>
            <DialogContent>
              {selectedItem && (
                <>
                  <img
                    src={selectedItem.img}
                    alt={selectedItem.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
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
                    handletoast();
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

      )}
      <WhatsAppButton/>
<ProductReviewsAndFAQs/>
    </div>

);
}
