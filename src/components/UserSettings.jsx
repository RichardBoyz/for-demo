"use client";
import { Menu, MenuItem, Modal } from "@mui/material";
import { useState } from "react";
import { LuCircleUserRound } from "react-icons/lu";
import SignInAndOutForm from "./SignInAndOutForm";

const UserSettings = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    handleClose();
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <LuCircleUserRound
        id="user-settings-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={36}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "user-settings-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>設定</MenuItem>
        {/* 如果是尚未登入的話要顯示登入 */}

        <MenuItem onClick={handleModalOpen}>登入</MenuItem>
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute bg-slate-100 dark:bg-cyan-900 rounded-lg p-2 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-1/2 md:w-1/2">
          <SignInAndOutForm handleClose={handleModalClose} />
        </div>
      </Modal>
    </div>
  );
};

export default UserSettings;
