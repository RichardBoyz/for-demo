import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { LoginForm } from ".";
import SignUpForm from "./SignUpForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="h-full"
    >
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </div>
  );
}

const SignInAndOutForm = ({ handleClose = () => {} }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        textColor="black dart:white"
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab label="登入" />
        <Tab label="註冊" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <LoginForm onClose={handleClose} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUpForm onClose={handleClose} />
      </TabPanel>
    </Box>
  );
};

export default SignInAndOutForm;
