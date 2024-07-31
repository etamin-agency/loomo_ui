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
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function IconMenu(props) {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(`https://loomo.online/posts/${props?.postId}`)
            .then(() => {
                setOpenSnackbar(true);
            });
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
                    <MenuItem>
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
        </div>
    );
}
