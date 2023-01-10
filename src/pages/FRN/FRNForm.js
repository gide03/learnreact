import { useState } from "react";
import styled from "styled-components";
import FormContext from "./FormContext";
import FormBar from "./FormBar";
import RenderedForm from "./RenderedForm";

const MForm = styled.div`
  width: 100%;
  display: flex;
`;

const FRNForm = () => {
  const [projectName, setProjectName] = useState("Project Name");
  const [imageTitle, setImageTitle] = useState("Image Title");
  const [imageSubtitle, setImageSubtitle] = useState("Image Subtitle");
  const [releaseDate, setReleaseDate] = useState("Release Date");
  const [NLRSignature, setNLRSignature] = useState("NLR Signature");
  const [NLR2Signature, setNLR2Signature] = useState("NLR2 Signature");
  const [LRSignature, setLRSignature] = useState("LR Signature");
  const [selectedFiles, setSelectedFiles] = useState("");
  const [files, setFiles] = useState({ keys: [], list: [], sha256: [] });
  const [markdownText, setMarkdownText] = useState(`
# Image Description
...

# Signatures
|Type|Version|Signature|
|----|-------|---------|
|NLR |  ...  |   ...   |
|NLR2|  ...  |   ...   |
|LR  |  ...  |   ...   |

# Release Note
Release Note


# Changes Log
1. 
2. 
3. 
    `);

  const contextValue = {
    markdownText,
    setMarkdownText,
    projectName,
    setProjectName,
    releaseDate,
    setImageTitle,
    imageTitle,
    setReleaseDate,
    imageSubtitle,
    setImageSubtitle,
    NLRSignature,
    setNLRSignature,
    NLR2Signature,
    setNLR2Signature,
    LRSignature,
    setLRSignature,
    selectedFiles,
    setSelectedFiles,
    files,
    setFiles,
  };

  return (
    <MForm>
      <FormContext.Provider value={contextValue}>
        <FormBar></FormBar>
        <RenderedForm></RenderedForm>
      </FormContext.Provider>
    </MForm>
  );
};

export default FRNForm;
