"use client";
import useNavigate from "@/hooks/useNavigate";
import { AuthContext } from "@/providers/AuthContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { ThemeToggle } from ".";
import AdminMenu from "./AdminMenu";
import UserSettings from "./UserSettings";

const tabs = [
  {
    name: "旅遊趣",
    href: "/travel-spot",
  },
  {
    name: "電話簿",
    href: "/phonebook",
  },
  {
    name: "關於我們",
    href: "/about",
  },
];

const Header = () => {
  const { navigateTo } = useNavigate();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const toggleDrawer = (open) => {
    setOpen(open);
  };
  const handleNavigate = (path) => {
    console.log(path);
    toggleDrawer(false);
    navigateTo(path);
  };

  useEffect(() => {
    if (isMdUp && open) {
      toggleDrawer(false);
    }
  }, [isMdUp, open]);

  return (
    <div className="z-10 flex items-center justify-between px-4 bg-header-bg shadow-sm fixed top-0 left-0 h-header-height w-full font-bold">
      <img
        onClick={() => navigateTo("/")}
        src="https://play-lh.googleusercontent.com/3r3ZmMv0cAsqx0k0Nc0ZlFC7Vnmtj8bxRXNC06yKdjXDzfKOgoRkplpdGf2ADHvTfg=w240-h480-rw"
        className="cursor-pointer h-3/5 aspect-square object-cover object-center"
      />

      <div className="hidden gap-2 items-center md:flex">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className="px-4 py-2 text-lg rounded-lg text-black dark:text-white hover:bg-gray-200 dark:hover:bg-slate-900/80 dark:hover:text-white transition-colors"
          >
            {tab.name}
          </a>
        ))}
        {user && <AdminMenu />}

        <ThemeToggle />
        <UserSettings />
      </div>

      <div className="md:hidden">
        <button className="px-4 py-2">
          <IoMenu size={36} onClick={() => toggleDrawer(true)} />
        </button>
        <Drawer
          open={open}
          slotProps={{
            paper: {
              sx: {
                width: "fit-content",
                backgroundColor: "var(--nav-drawer-bg)",
              },
            },
          }}
          onClose={() => toggleDrawer(false)}
        >
          <List
            subheader={
              <div className="flex justify-between items-center px-4 h-header-height">
                <div className="flex gap-1 items-center">
                  <UserSettings handleNavBarClose={() => toggleDrawer(false)} />
                  <ThemeToggle />
                </div>
                <div className="px-4 py-2">
                  <IoClose
                    className="cursor-pointer text-icon-color"
                    size={36}
                    onClick={() => toggleDrawer(false)}
                  />
                </div>
              </div>
            }
            className="text-black dark:text-white"
          >
            {tabs.map((tab) => (
              <ListItem
                className="cursor-pointer"
                key={tab.name}
                onClick={() => handleNavigate(tab.href)}
              >
                <ListItemText primary={tab.name} />
              </ListItem>
            ))}
            {user && (
              <ListItem>
                <AdminMenu />
              </ListItem>
            )}
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
