import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopy from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { Snackbar, Alert, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import publishService from "../../services/publishService";

export default function IconMenu(props) {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(`https://loomo.online/posts/${props?.postId}`)
            .then(() => {
                setOpenSnackbar(true);
            });
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        publishService.deletePost(props?.postId)
            .then((data) => {
                if (data){
                    // console.log(props?.postId + " is deleted");
                    props?.onDelete(props?.postId)
                }
                setOpenDialog(false);
            });
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const editPost = () => {
        navigate(`/edit/${props.postId}`);
    };

    return (
        <div className='MenuItems'>
            <Paper sx={{ width: 155, maxWidth: '100%', marginRight: '10px' }}>
                <MenuList>
                    <MenuItem onClick={handleDeleteClick}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={copyLink}>
                        <ListItemIcon>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Copy Link</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={editPost}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiDialog-paper': {
                        maxWidth: '400px',
                        marginBottom: '25vh',
                        padding: '10px',
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{fontSize: '22px'}}>{"Are you sure you want to delete this post?"}</DialogTitle>
                <DialogActions sx={{gap: '5px', margin: '0 25px'}}>
                    <Button onClick={handleCancelDelete} variant='outlined'  color='error'>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} variant='contained' color='primary' autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
