import React from "react";

const defaultContext = {
  basicInfo: "",
  setBasicInfo: () => {},
};

export default React.createContext(defaultContext);
