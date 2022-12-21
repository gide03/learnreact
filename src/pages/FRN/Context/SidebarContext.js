import React from "react";

const defaultContext = {
  projectlist: [],
  setProjectList: () => {},
  activeProject: "",
  setActiveProject: () => {},
};

export default React.createContext(defaultContext);
