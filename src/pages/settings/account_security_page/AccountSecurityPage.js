import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import authService from "../../../services/authService";
import "./AccountSecurityPage.scss";

function AccountSecurityPage() {
    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleOpenEmailDialog = () => setOpenEmailDialog(true);
    const handleCloseEmailDialog = () => {
        setOpenEmailDialog(false);
        setEmailError("");
        setNewEmail('')
        setCurrentPassword('')
    };

    const handleOpenPasswordDialog = () => setOpenPasswordDialog(true);
    const handleClosePasswordDialog = () => {
        setOpenPasswordDialog(false);
        setPasswordError("");
        setCurrentPassword("");
        setConfirmPassword('')
        setNewPassword('')
    };


    const setNewEmailOnChange = (value) => {
        setNewEmail(value);
        if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError('')
        }
    }

    const handleEmailUpdate = async () => {
        setEmailError("");

        if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        try {
            const response = await authService.checkEmail(newEmail);
            if (response) {
                setEmailError("This email is already in use.");
            } else {
                console.log("Email updated successfully!");
                handleCloseEmailDialog();
            }
        } catch (error) {
            console.error("Error updating email:", error);
            setEmailError("An error occurred while updating the email.");
        }
    };

    const handlePasswordUpdate = async () => {
        setPasswordError("");

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        try {
            // Implement password update logic here
            console.log("Password updated successfully!");
            handleClosePasswordDialog();
        } catch (error) {
            console.error("Error updating password:", error);
            setPasswordError("An error occurred while updating the password.");
        }
    };

    return (
        <div className="AccountSecurityPage">
            <form>
                <div className="form-email">
                    <div className="label-text">Email:</div>
                    <div className="input-container">
                        <input type="email" className="input-field" readOnly />
                        <IconButton
                            className="edit-button"
                            onClick={handleOpenEmailDialog}
                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="form-password">
                    <div className="label-text">Password:</div>
                    <div className="input-container">
                        <input
                            type="password"
                            className="input-field"
                            readOnly
                        />
                        <IconButton
                            className="edit-button"
                            onClick={handleOpenPasswordDialog}
                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                </div>
            </form>

            {/* Email Dialog */}
            <Dialog open={openEmailDialog} onClose={handleCloseEmailDialog}>
                <DialogTitle>Update Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your new email and current password to
                        update your email.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="New Email"
                        type="email"
                        autoComplete="new-email"
                        required
                        fullWidth
                        value={newEmail}
                        onChange={(e) => setNewEmailOnChange(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        margin="dense"
                        label="Current Password"
                        type="password"
                        required
                        autoComplete="new-password"
                        fullWidth
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseEmailDialog}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    
                    <Button onClick={handleEmailUpdate} variant="contained" disabled={!!emailError}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Password Dialog */}
            <Dialog
                open={openPasswordDialog}
                onClose={handleClosePasswordDialog}
            >
                <DialogTitle>Update Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your current password and the new password.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Current Password"
                        type="password"
                        required
                        fullWidth
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        required
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        helperText={passwordError}
                        error={!!passwordError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClosePasswordDialog}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handlePasswordUpdate}
                        variant="contained"
                        type="submit"
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AccountSecurityPage;
