import * as React from 'react';
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect, useRef } from "react";
import IconMenu from "./IconMenu";

import './MenuItems.scss';

export default function MenuItems(props) {
    const [isPostIconOpen, setPostIconOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handlePostIconClick = () => {
        setPostIconOpen(!isPostIconOpen);
        setTimeout(() => {
            if (!isHovered) {
                setPostIconOpen(false);
            }
        }, 4000);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPostIconOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)
        ) {
            setPostIconOpen(false);
        }
    };

    useEffect(() => {
        if (isPostIconOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isPostIconOpen]);

    return (
        <div className='MenuItems'>
            <IconButton
                id="long-button"
                onClick={handlePostIconClick}
                ref={buttonRef}
            >
                <MoreVertIcon />
            </IconButton>
            {isPostIconOpen &&
                <div
                    ref={menuRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <IconMenu postId={props?.postId} />
                </div>
            }
        </div>
    );
}
