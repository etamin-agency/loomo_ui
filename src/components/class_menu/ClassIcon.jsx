import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EditIcon from "@mui/icons-material/Edit";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function IconMenu(props) {
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.role);

    const editPost = () => {
        navigate(`/edit/${props.classId}`);
    };

    return (
        <div className="ClassMenuIcons">
            <Paper
                sx={{
                    width: 200,
                    maxWidth: "100%",
                    marginRight: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <MenuList>
                    {role === "teacher" ? (
                        <>
                            <MenuItem
                                sx={{
                                    padding: "10px 15px",
                                    "&:hover": {
                                        backgroundColor: "#e0f7fa",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: "36px" }}>
                                    <NotificationsActiveOutlinedIcon
                                        sx={{ color: "#00796b" }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: "14px",
                                    }}
                                >
                                    Send
                                </ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={editPost}
                                sx={{
                                    padding: "10px 15px",
                                    "&:hover": {
                                        backgroundColor: "#e0f7fa",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: "36px" }}>
                                    <EditIcon sx={{ color: "#00796b" }} />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: "14px",
                                    }}
                                >
                                    Edit
                                </ListItemText>
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem
                            sx={{
                                padding: "10px 15px",
                                "&:hover": {
                                    backgroundColor: "#e0f7fa",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: "36px" }}>
                                <HelpOutlineOutlinedIcon
                                    sx={{ color: "#00796b" }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ fontSize: "14px" }}
                            >
                                Course Details
                            </ListItemText>
                        </MenuItem>
                    )}
                </MenuList>
            </Paper>
        </div>
    );
}
