import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GithubIcon from "@mui/icons-material/Github";
import FacebookIcon from '@mui/icons-material/Facebook';
// import YoutubeIcon from "@mui/icons-material/Youtube"
export const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", bgcolor: "#1a1a19", color: "white", p: 2 }}>
      <Box
        sx={{
          my: 3,
          "& svg": {
            fontSize: "50px",
            cursor: "pointer",
            mr: 2,
          },
          "& svg:hover":{
            color:"goldenrod",
            transform:"translateX(8px)",
            transition:"all 400ms"

          }
        }}
      >
        <InstagramIcon />
        <TwitterIcon />
        <FacebookIcon/>
        {/* <YoutubeIcon/> */}
      </Box>
      <Typography
        variant="h5"
        sx={{
          "@media(max-width)": {
            fontSize: "1rem",
          },
        }}
        style={{
          backgroundColor: "transparent",
          color: "goldenrod",
          padding: 2,
        }}
      >
        All Right Reserved &copy; Crystal
      </Typography>
    </Box>
  );
};
