import mStyle from "./frn.module.css";
import Markdown from "react-remarkable";
import { useContext } from "react";
import FormContext from "./FormContext";
import styled from "styled-components";

const MainContainer = styled.div`
  background-color: #fff;
  width: 70%;
  height: 100%;
  margin-left: 10px;
  font-size: 12px;

  overflow: scroll;
  overflow-x: hidden;
`;

const Header = styled.div`
  background-color: #026dc9;
  padding: 0px 0.5rem 0px 0.5rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;

const ImageDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 0px 1rem 0px 1rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

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

const CardContainer = styled.div`
  /* width: 98%; */
  /* display: flex; */
  /* flex-wrap: wrap; */
`;
const Card = styled.div`
  background-color: #dedede;
  color: black;

  display: flex;
  justify-content: center;
  margin-bottom: 3px;

  /* padding: 0.2em 0.2em 0.2em 1rem; */
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

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

const FileCard = (props) => {
  const filename = props.file.name;
  const sha256 = props.sha256;
  return (
    <Card>
      <div style={{ width: "80%" }}>
        <h1>{filename}</h1>
        <p>sha256: {sha256}</p>
      </div>
    </Card>
  );
};

const RenderedForm = () => {
  const { markdownText, files, projectName, releaseDate, imageTitle } =
    useContext(FormContext);
  return (
    <MainContainer className={`${mStyle.fadeIn}`}>
      <div className={`${mStyle.thumbnailContainer}`}>
        <Header>
          <h1>Release Info</h1>
        </Header>
        <div>
          <h1>{projectName}</h1>
          <h2>{imageTitle}</h2>
          <span>{releaseDate}</span>
        </div>
      </div>
      <div className={`${mStyle.thumbnailContainer}`}>
        <Header>
          <h2>Attachments</h2>
        </Header>
        <CardContainer>
          {files.keys.map((_key, idx) => (
            <FileCard
              key={_key}
              file={files.list[idx]}
              sha256={files.sha256[idx]}
              idx={_key}
            ></FileCard>
          ))}
        </CardContainer>
      </div>
      <div className={`${mStyle.thumbnailContainer}`}>
        <Header>
          <h2>Rendered Image Detail</h2>
        </Header>
        <ImageDescription>
          <Markdown source={`${markdownText}`}></Markdown>
        </ImageDescription>
      </div>
    </MainContainer>
  );
};

export default RenderedForm;
