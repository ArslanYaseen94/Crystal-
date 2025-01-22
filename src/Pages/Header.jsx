import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import TapasIcon from "@mui/icons-material/Tapas";
import { NavLink } from "react-router-dom";
import "../Headerstyle.css";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";
import DiamondIcon from '@mui/icons-material/Diamond';
import { useDispatch, useSelector } from "react-redux";
import { getcarttotal } from "../store/slice";
import {  CartIcons } from "./Carticon";
export const Header = () => {
  const [mobileopen, setMobileopen] = useState(false);
  const handledrawetoggler = () => {
    setMobileopen(!mobileopen);
  };
  const drawer = (
    <Box onClick={handledrawetoggler} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        style={{display:"flex",justifyContent: "center",alignItems: "center"}}
        sx={{ flexGrow: 1, my: 2 }}
      >
        <DiamondIcon />
        Crystal
      </Typography>
      <Divider />
      <ul className="mobilenav">
        <li style={{ color: "black" }}>
          <NavLink style={{ color: "black" }} to={"/"}>
            Home
          </NavLink>
        </li>
        <li style={{ color: "black" }}>
          <NavLink style={{ color: "black" }} to={"/home/menu"}>
            Menu
          </NavLink>
        </li>
        <li style={{ color: "black" }}>
          <NavLink style={{ color: "black" }} to={"/home/favourite"}>
            Favourite
          </NavLink>
        </li>
        <li style={{ color: "black" }}>
          <NavLink style={{ color: "black" }} to={"/home/cart"}>
            <ShoppingCartIcon/>Cart
          </NavLink>
        </li>
        <li style={{ color: "black" }}>
          <NavLink style={{ color: "black" }} to={"/home/about"}>
            About
          </NavLink>
        </li>
        <li style={{ color: "black" }}>
          <NavLink style={{ color: "black" }} to={"/home/contact"}>
            Contact
          </NavLink>
        </li>
      </ul>
    </Box>
  );
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.Allstore);
  useEffect(() => {
    dispatch(getcarttotal());
  }, [cart]);
  return (
    <div>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              sx={{ m: 2, display: { xs: "block", sm: "none" } }} // Change to block for xs
              color="white"
              aria-label="open drawer"
              edge="start"
              onClick={handledrawetoggler}
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="icon"
              style={{display:"flex",justifyContent: "center",alignItems: "center",marginLeft:"-200px"}}
            >
              <DiamondIcon />
              Crystal
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="uldesign">
                <li>
                  <NavLink style={{ color: "white" }} to={"/"} end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink style={{ color: "white" }} to={"/home/menu"}>
                    Menu
                  </NavLink>
                </li>
                <li style={{ color: "white" }}>
                  <NavLink style={{ color: "white" }} to={"/home/favourite"}>
                    Favourite
                  </NavLink>
                </li>
                <li>
                  <NavLink style={{ color: "white" }} to={"/home/cart"}>
                  {/* <ShoppingCartIcon/>Cart */}
                  <CartIcons/>
                  </NavLink>
                </li>
                <li>
                  <NavLink style={{ color: "white" }} to={"/home/about"}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink style={{ color: "white" }} to={"/home/contact"}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component={"nav"}>
          <Drawer
            variant="temporary"
            open={mobileopen}
            onClose={handledrawetoggler}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </div>
  );
};
