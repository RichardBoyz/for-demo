import Parse from "parse";

const APPLICATION_ID =
  process.env.NEXT_PUBLIC_APPLICATION_ID || process.env.APPLICATION_ID;
const JS_KEY = process.env.NEXT_PUBLIC_JS_KEY || process.env.JS_KEY;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

export const initializeParse = () => {
  if (Parse.applicationId && Parse.applicationId == APPLICATION_ID) {
    return;
  }
  console.log(APPLICATION_ID);
  console.log(JS_KEY);

  Parse.initialize(APPLICATION_ID, JS_KEY);
  Parse.serverURL = SERVER_URL;
};
