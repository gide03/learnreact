import React from "react";

const defaultContext = {
  markdownText: "",
  setMarkdownText: () => {}, //empty function
};

export default React.createContext(defaultContext);
