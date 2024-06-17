import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Box,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const smallScreen = useMediaQuery("max-width: 700px");

interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Welcome, {user?.display_name}</Typography>
          <IconButton edge="end" color="inherit" onClick={handleOpen}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: smallScreen ? "20rem" : "30rem",
            backgroundColor: "black",
            color: "white",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <Avatar
            src={user?.images?.[0]?.url}
            alt={user?.display_name}
            style={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography style={{ textAlign: "center", margin: "1rem 0" }}>
            {user?.display_name}
          </Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Country: {user?.country}</Typography>
          <Typography>Followers: {user?.followers?.total}</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
