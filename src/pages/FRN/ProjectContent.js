import { React, useContext, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ImageThumbnail from "./Components/ImageThumbnail";
import SidebarContext from "./Context/SidebarContext";
import PresentationContext from "./Context/PresentationContext";
import ImageContent from "./Components/ImageContent";

const dummyDataThumnail = [
  {
    title: "ITE620_LRv08.24_NLR1v08.32_NLR2v08.32",
    releaseDate: "2 January 2022",
    subtitle: "Image for International 2",
    images: {
      imfw: "http://localhost:5000/frn/download/imfw_asldkasldkj",
      cmfw: "http://localhost:5000/frn/download/cmfw_lkajdslkajdij",
      ota: "http://localhost:5000/frn/download/ota_alsdlkjsdad",
    },
    markdown: `
  ### Image Description
  Image for project EM620
  
  ### Signatures
  |Type|Signature|
  |----|---------|
  |NLR|e02048f0409116fb6a3b9c7c4bdcfe6315c2d105ee84092d9bbdd74045b43c9f|
  |NLR2|9998190d90c59b268e62355c13c391d5ddb89f0188a267fdef72ca5624ac2513|
  |LR|c3a5058af6669ca3ed1944d3db56ad279ae515d62428e47468fd9e7ba22de2be|
  
  ### Release Note
  Please install using USB or OTA update from previous version
  
  ### Changes Log
  1. Update based on CTT test: fix test object , fix key agreement algo id value
  2. Bugfix clear status CIV on LP status
  3. Bugfix status DNV on LP status
        `,
    sha256: "e02048f0409116fb6a3b9c7c4bdcfe6315c2d105ee84092d9bbdd74045b43c9f",
  },
  {
    title: "ITE620_LRv08.24_NLR1v08.32_NLR2v08.32",
    releaseDate: "3 January 2022",
    subtitle: "Image for International 2",
    images: {
      imfw: "http://localhost:5000/frn/download/imfw_asldkasldkj",
      cmfw: "http://localhost:5000/frn/download/cmfw_lkajdslkajdij",
      ota: "http://localhost:5000/frn/download/ota_alsdlkjsdad",
    },
    markdown: `
  # Image Description
  Image for project EM620
  
  # Signatures
  |Type|Signature|
  |----|---------|
  |NLR|e02048f0409116fb6a3b9c7c4bdcfe6315c2d105ee84092d9bbdd74045b43c9f|
  |NLR2|9998190d90c59b268e62355c13c391d5ddb89f0188a267fdef72ca5624ac2513|
  |LR|c3a5058af6669ca3ed1944d3db56ad279ae515d62428e47468fd9e7ba22de2be|
  
  # Release Note
  Please install using USB or OTA update from previous version
  
  # Changes Log
  1. Update based on CTT test: fix test object , fix key agreement algo id value
  2. Bugfix clear status CIV on LP status
  3. Bugfix status DNV on LP status`,
    sha256: "9998190d90c59b268e62355c13c391d5ddb89f0188a267fdef72ca5624ac2513",
  },
];

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

const ProjectContent = (props) => {
  const { activeProject } = useContext(SidebarContext);
  const [selectedImage, setSelectedImage] = useState("");

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
            //   console.log(e);
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
            {dummyDataThumnail
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
