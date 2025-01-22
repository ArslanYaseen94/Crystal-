import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";

export function LoadingSkeleton() {
  return (
    <div>
      <div className="sese">
        <Skeleton
          animation="pulse"
          variant="rounded"
          width={430}
          height={40}
          sx={{ marginLeft: "34%", marginTop: "20px" }}
        />
      </div>
      <div className="skel">
        <Card sx={{ maxWidth: 270, m: 2 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            // action={
            // //    ? null : (
            // //     <IconButton aria-label="settings">
            // //       <MoreVertIcon />
            // //     </IconButton>
            // //   )
            // }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          {
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          }
          <CardContent>
            {
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            }
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 270, m: 2 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            // action={
            // //    ? null : (
            // //     <IconButton aria-label="settings">
            // //       <MoreVertIcon />
            // //     </IconButton>
            // //   )
            // }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          {
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          }
          <CardContent>
            {
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            }
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 270, m: 2 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            // action={
            // //    ? null : (
            // //     <IconButton aria-label="settings">
            // //       <MoreVertIcon />
            // //     </IconButton>
            // //   )
            // }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          {
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          }
          <CardContent>
            {
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            }
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 270, m: 2 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            // action={
            // //    ? null : (
            // //     <IconButton aria-label="settings">
            // //       <MoreVertIcon />
            // //     </IconButton>
            // //   )
            // }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          {
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          }
          <CardContent>
            {
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
