import React from "react";

const defaultContext = {
  selectedImage: "",
  setSelectedImage: () => {},
};

export default React.createContext(defaultContext);
