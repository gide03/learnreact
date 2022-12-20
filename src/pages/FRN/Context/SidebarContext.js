import React from "react";

const defaultContext = {
  projectlist: [],
  setProjectList: () => {},
};

export default React.createContext(defaultContext);
