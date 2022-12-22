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
  background-color: orange;
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

const RenderedForm = () => {
  const { markdownText } = useContext(FormContext);
  return (
    <MainContainer className={`${mStyle.fadeIn}`}>
      <div className={`${mStyle.formHeader}`}>
        <h1>Rendered Image</h1>
      </div>
      <div className={`${mStyle.thumbnailContainer}`}>
        <Header>
          <h2>Rendered Thumbnail</h2>
        </Header>
        {/* <ImageThumbnail
          data={thumbnailData}
          contentSelect={() => {}}
        ></ImageThumbnail> */}
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
