import { useContext } from "react";
import styled from "styled-components";
import Markdown from "react-remarkable";
import axios from "axios";
import PresentationContext from "../Context/PresentationContext";
import ConnSetting from "../Context/ConnSetting";

const PresentationPanel = styled.div`
  width: 100%;
  height: 100px;
  font-size: 0.7em;
  padding-bottom: 40rem;
  h1 {
    font-size: 1rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ImageDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  table,
  th,
  td {
    border-collapse: collapse;
    border: 1px solid black;
  }
  th {
    width: 4rem;
  }
  td {
    padding: 0px 5px 0px 5px;
    max-width: 75%;
    overflow: hidden;
    white-space: nowrap;
  }

  table {
    margin: auto;
  }
`;

const Card = styled.div`
  width: 99%;
  background-color: #dedede;
  color: black;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2em;

  padding: 0.2em 0.3em 0.2em 1rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  border-radius: 3px;
  transition: all 0.3s;

  :hover {
    background-color: #b8b8b8;
    cursor: pointer;
  }

  h1 {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    margin-top: -0.3em;
    font-size: 0.6rem;
    white-space: nowrap;
    overflow: hidden;
  }
`;

// COMPONENTS
const CompAttachment = (props) => {
  const { selectedImage } = useContext(PresentationContext);
  const { BackendAddress, BackendPort } = useContext(ConnSetting);
  const filename = props.file;
  const sha256 = props.sha256;
  const contextid = selectedImage.id;
  const projectname = selectedImage.projectname;

  const downloadImage = () => {
    axios({
      method: "POST",
      url: `http://${BackendAddress}:${BackendPort}/frn/file/download`,
      responseType: "blob",
      data: {
        projectname: projectname,
        contextid: contextid,
        filename: filename,
      },
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  return (
    <Card onClick={() => downloadImage()}>
      <div style={{ width: "70%" }}>
        <h1>{filename}</h1>
        <p>sha256: {sha256}</p>
      </div>
    </Card>
  );
};

const ImageContent = () => {
  const { selectedImage } = useContext(PresentationContext);
  const images = selectedImage.images;

  return (
    <PresentationPanel>
      <h1>Image Description</h1>
      <span>Release Date: {selectedImage["release date"]}</span>

      <h1>Attachments</h1>
      <ImageContainer>
        {Object.keys(images).map((image, _key) => (
          <CompAttachment
            key={_key}
            file={image}
            sha256={images[image]}
          ></CompAttachment>
        ))}
        <ImageDescription>
          <Markdown source={selectedImage.markdown}></Markdown>
        </ImageDescription>
      </ImageContainer>
    </PresentationPanel>
  );
};

export default ImageContent;
