import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const SwitchToLoginView = ({ open, onClose }) => {
    const navigate = useNavigate();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Action Required
                <IconButton
                    className="closeButton"
                    color="primary"
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 40,
                        height: 40,
                    }}
                >
                    <CloseIcon sx={{ fontSize: 24 }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography>Switch to Student Account Please</Typography>
            </DialogContent>
        </Dialog>
    );
};

export default SwitchToLoginView;
