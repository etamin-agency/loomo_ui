import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthDialog = ({ open, onClose }) => {
    const navigate = useNavigate();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Action Required</DialogTitle>
            <DialogContent>
                <Typography>Please log in or sign up to attend the demo.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => navigate("/signup")} variant="contained" color="success">Sign Up</Button>
                <Button onClick={() => navigate("/login")} variant="contained" color="primary">Log In</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthDialog;
