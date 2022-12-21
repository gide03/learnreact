import { useContext } from "react";
import PresentationContext from "../Context/PresentationContext";
import styled from "styled-components";
import Markdown from "react-remarkable";

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

const DownloadableImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  height: 3.5rem;
  width: 20rem;
  padding: 0px 5px 0px 5px;
  border-radius: 3px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  transition: all 0.2s;
  background-color: #cccccc;
  color: #404040;

  :hover {
    cursor: pointer;
    background-color: #bbbbbb;
    color: #202020;
  }

  h3 {
    width: 5rem;
    overflow: hidden;
    text-align: center;
  }
  div {
    width: 13rem;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
  }
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

// COMPONENTS
const Comp_Attachment = (props) => {
  return (
    <DownloadableImage>
      <h3>{props.title}</h3>
      <div
        style={{
          width: "0.2em",
          backgroundColor: "#e6e6e6",
          height: "80%",
          borderRadius: "10px",
        }}
      ></div>
      <div>
        sha256: lajkldjklajdklajdkljaskldjaskdjklsajdlajsdlkasdjlkadjakldjljs
      </div>
    </DownloadableImage>
  );
};

const ImageContent = () => {
  const { selectedImage } = useContext(PresentationContext);
  const images = selectedImage.images;

  return (
    <PresentationPanel>
      <h1>Image Description</h1>
      <span>Release Date: {selectedImage.releaseDate}</span>

      <h1>Attachments</h1>
      <ImageContainer>
        {Object.keys(images).map((image, index) => (
          <Comp_Attachment
            key={`image-thumbnail-${index}`}
            title={image}
            data={images[image]}
          ></Comp_Attachment>
        ))}
        <ImageDescription>
          <Markdown source={selectedImage.markdown}></Markdown>
        </ImageDescription>
      </ImageContainer>
    </PresentationPanel>
  );
};

export default ImageContent;
