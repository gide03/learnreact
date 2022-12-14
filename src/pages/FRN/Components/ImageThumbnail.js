import axios from "axios";
import { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import PresentationContext from "../Context/PresentationContext";
import SidebarContext from "../Context/SidebarContext";
import ConnSetting from "../Context/ConnSetting";

const Thumbnail = styled.div`
  width: 100%;
  height: 1.3rem;
  background-color: ${(props) =>
    props.theme.isSelected ? "rgba(186, 234, 255, 0.8)" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  font-size: 0.5rem;
  transition: all 0.3s;
  color: ${(props) => (props.theme.isSelected ? "rgb(0, 118, 186)" : "black")};

  :hover {
    background-color: ${(props) =>
      props.theme.isHeader
        ? "transparent"
        : props.theme.isSelected
        ? "rgba(186, 234, 255, 0.8)"
        : "#efefef"};
  }
`;
const ImageName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  padding-left: 0.4rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;
const ReleaseDate = styled.span`
  min-width: 5rem;
`;

const ImageThumbnail = (props) => {
  const { selectedImage, setSelectedImage } = useContext(PresentationContext);
  const { activeProject } = useContext(SidebarContext);
  const { BackendAddress, BackendPort } = useContext(ConnSetting);

  const data = props.data;
  const theme = {
    isHeader: props.isHeader,
    isSelected: false,
  };

  const selectImage = () => {
    axios({
      method: "post",
      url: `http://${BackendAddress}:${BackendPort}/frn/getcontent`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: data.id,
        "project-name": activeProject,
        "release-title": data.title,
        "release-date": data.releaseDate,
      },
    }).then((response) => {
      let data = response.data;
      setSelectedImage(data);
    });
  };

  if (props.isHeader)
    return (
      <ThemeProvider theme={theme}>
        <Thumbnail>
          <ImageName>{data.title}</ImageName>
          <ReleaseDate>{data.releaseDate}</ReleaseDate>
        </Thumbnail>
      </ThemeProvider>
    );
  else {
    theme.isSelected = selectedImage.id === props.data.id;
    return (
      <ThemeProvider theme={theme}>
        <Thumbnail onClick={() => selectImage()}>
          <ImageName>{data.title}</ImageName>
          <ReleaseDate>{data.releaseDate}</ReleaseDate>
        </Thumbnail>
      </ThemeProvider>
    );
  }
};

export default ImageThumbnail;
