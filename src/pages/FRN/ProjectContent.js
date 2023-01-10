import { React, useContext, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ImageThumbnail from "./Components/ImageThumbnail";
import SidebarContext from "./Context/SidebarContext";
import ConnSetting from "./Context/ConnSetting";
import PresentationContext from "./Context/PresentationContext";
import ImageContent from "./Components/ImageContent";
import axios from "axios";

const ContentContainer = styled.div`
  width: 95%;
  max-width: 800px;
`;

const ContentTitle = styled.div`
  width: 100%;

  h1 {
    font-size: 1rem;
    font-weight: bolder;
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  min-height: 15rem;
  max-height: ${(props) => (props.theme.isImageSelected ? "15rem" : "20rem")};
  overflow-x: hidden;
`;

const ProjectContent = () => {
  const { activeProject } = useContext(SidebarContext);
  const { BackendAddress, BackendPort } = useContext(ConnSetting);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageRelease, setImageRelease] = useState([]);

  useEffect(() => {
    if (activeProject !== "") {
      axios({
        method: "post",
        url: `http://${BackendAddress}:${BackendPort}/frn/getimagerelease`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { "project-name": activeProject },
      }).then((response) => {
        let data = response.data.payload;
        setImageRelease(data);
      });
    }
  }, [activeProject, setImageRelease, BackendAddress, BackendPort]);

  const contextValue = {
    selectedImage,
    setSelectedImage,
  };

  const theme = {
    isImageSelected: selectedImage !== "",
  };

  return (
    <PresentationContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <ContentContainer
          tabIndex="1"
          onKeyUp={(e) => {
            if (e.key === "Escape") setSelectedImage("");
          }}
        >
          <ContentTitle tabIndex="2">
            <h1>Image Release - {activeProject}</h1>
          </ContentTitle>

          <ThumbnailContainer tabIndex="2">
            <hr></hr>
            <ImageThumbnail
              data={{ title: "Image Name", releaseDate: "Release Date" }}
              isHeader={true}
            ></ImageThumbnail>
            <hr></hr>
            {imageRelease
              .map((data, idx) => (
                <ImageThumbnail
                  key={`${data}_${idx}`}
                  data={data}
                  isHeader={false}
                ></ImageThumbnail>
              ))
              .reverse()}
          </ThumbnailContainer>
          {selectedImage && (
            <>
              <hr></hr>
              <ImageContent></ImageContent>
            </>
          )}
        </ContentContainer>
      </ThemeProvider>
    </PresentationContext.Provider>
  );
};

export default ProjectContent;
