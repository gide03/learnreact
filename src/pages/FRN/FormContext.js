import React from "react";

const defaultContext = {
  projectName: "",
  setProjectName: () => {},
  markdownText: "",
  setMarkdownText: () => {},
  releaseDate: "",
  setImageTitle: () => {},
  imageTitle: "",
  setReleaseDate: () => {},
  NLRSignature: "",
  setNLRSignature: () => {},
  NLR2Signature: "",
  setNLR2Signature: () => {},
  LRSignature: "",
  setLRSignature: () => {},
  selectedFiles: "",
  setSelectedFiles: () => {},
  files: { keys: [], list: [], sha256: [] },
  setFiles: () => {},
};

export default React.createContext(defaultContext);
