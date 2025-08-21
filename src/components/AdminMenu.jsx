"use client";
import useNavigate from "@/hooks/useNavigate";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const AdminMenu = () => {
  const { navigateTo } = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleClose();
    navigateTo(path);
  };

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-black dark:text-white text-lg"
      >
        管理員選項
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={() => handleNavigate("add-travel-spot")}>
          新增景點
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("add-room")}>新增房間</MenuItem>
      </Menu>
    </div>
  );
};

export default AdminMenu;
