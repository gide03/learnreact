import {React, useContext, useState} from "react";

const defaultContext = {
  basicInfo: "",
  setBasicInfo: () => {},
};

export default React.createContext(defaultContext);
