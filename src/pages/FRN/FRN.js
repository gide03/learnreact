import mStyle from "./frn.module.css";
import { useState } from "react";
import Markdown from "react-remarkable";
import FRNForm from "./FRNForm";
import ImageThumbnail from "./Thumbnail";

import FRN_SideBar from "./Sidebar";
import ProjectContent from "./ProjectContent";
import SidebarContext from "./Context/SidebarContext";

const dummyDataThumnail = [
  {
    title: "ITE620_LRv08.24_NLR1v08.32_NLR2v08.32 – International 2",
    releaseDate: "2 January 2022",
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
3. Bugfix status DNV on LP status
      `,
    sha256: "e02048f0409116fb6a3b9c7c4bdcfe6315c2d105ee84092d9bbdd74045b43c9f",
  },
  {
    title: "ITE620_LRv08.24_NLR1v08.32_NLR2v08.32 – International 2",
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

const ContentSection = (props) => {
  return (
    <div className={`${mStyle.modal}`}>
      <div className={`${mStyle.imageHeader}`}>
        <h1>{props.data.title}</h1>
        <h2>{props.data.releaseDate}</h2>
      </div>
      <div className={`${mStyle.imageDescription}`}>
        <Markdown source={`${props.data.markdown}`}></Markdown>
      </div>
      <button onClick={props.closeContent()}>Close Button</button>
    </div>
  );
};

// const FRNo = () => {
//   document.title = "Firmware Release Note";
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [flagAddImage, setFlagAddImage] = useState(false);

//   const handlerContentSelection = (data) => {
//     // console.log("handler content selected");
//     // console.log(data);
//     setSelectedImage(data);
//   };
//   const handlerCloseContent = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className={mStyle.pageContent}>
//       {!flagAddImage && (
//         <div className={`${mStyle.sideBar}`}>
//           <FRNSideBar></FRNSideBar>
//         </div>
//       )}
//       {!selectedImage && !flagAddImage && (
//         <>
//           <div className={`${mStyle.thumbnailContainer}`}>
//             <h1>Image Release - EM620 VOC (International 2)</h1>
//             <div className={`${mStyle.thumbnail}`}>
//               {dummyDataThumnail
//                 .map((data, idx) => (
//                   <ImageThumbnail
//                     key={`${data}_${idx}`}
//                     data={data}
//                     contentSelect={handlerContentSelection}
//                   ></ImageThumbnail>
//                 ))
//                 .reverse()}
//             </div>
//           </div>
//         </>
//       )}
//       {selectedImage && !flagAddImage && (
//         <ContentSection
//           data={selectedImage}
//           closeContent={() => handlerCloseContent}
//         ></ContentSection>
//       )}
//       {flagAddImage && <FRNForm key={"frnForm"}></FRNForm>}

//       <div className={`${mStyle.toolBar}`}>
//         <button onClick={() => setFlagAddImage(!flagAddImage)}>
//           {flagAddImage ? "Cancel" : "Add Image"}
//         </button>
//         {flagAddImage && (
//           <>
//             <button>Attach File</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

const FRN = () => {
  document.title = "Firmware Release Note";
  const [selectedImage, setSelectedImage] = useState(null);
  const [flagAddImage, setFlagAddImage] = useState(false);
  const [projectlist, setProjectList] = useState([
    "EM620",
    "EM620 VOC International 1",
    "EM620 VOC International 2",
  ]);
  const [activeProject, setActiveProject] = useState(projectlist[0]);

  // PUT HANDLER HERE
  const handlerContentSelection = (data) => {
    setSelectedImage(data);
  };
  const handlerCloseContent = () => {
    setSelectedImage(null);
  };

  const sharedContext = {
    projectlist,
    setProjectList,
    activeProject,
    setActiveProject,
  };

  // COMPONENT RENDER
  return (
    <SidebarContext.Provider value={sharedContext}>
      <div className={mStyle.pageContent}>
        {!flagAddImage && <FRN_SideBar></FRN_SideBar>}
        {!flagAddImage && (
          <div className={mStyle.internalContent}>
            {!selectedImage ? (
              <ProjectContent></ProjectContent>
            ) : (
              <ContentSection
                data={selectedImage}
                closeContent={() => handlerCloseContent}
              ></ContentSection>
            )}
          </div>
        )}
        {/* {selectedImage && !flagAddImage && (
          <ContentSection
            data={selectedImage}
            closeContent={() => handlerCloseContent}
          ></ContentSection>
        )} */}
        {flagAddImage && <FRNForm key={"frnForm"}></FRNForm>}

        <div className={`${mStyle.toolBar}`}>
          <button onClick={() => setFlagAddImage(!flagAddImage)}>
            {flagAddImage ? "Cancel" : "Add Image"}
          </button>
          {flagAddImage && (
            <>
              <button>Attach File</button>
            </>
          )}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
export default FRN;
