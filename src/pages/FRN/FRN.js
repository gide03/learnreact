import mStyle from "./frn.module.css";
import { useState } from "react";
import Markdown from "react-remarkable";

import FRNSidebar from "./Sidebar";
import ProjectContent from "./ProjectContent";
import SidebarContext from "./Context/SidebarContext";
import FRNForm from "./FRNForm";

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

const FRN = () => {
  document.title = "Firmware Release Note";
  const [selectedImage, setSelectedImage] = useState(null);
  const [flagAddImage, setFlagAddImage] = useState(false);
  const [projectlist, setProjectList] = useState([]);
  const [activeProject, setActiveProject] = useState("");

  // PUT HANDLER HERE
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
        {!flagAddImage && <FRNSidebar></FRNSidebar>}
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
        {flagAddImage && <FRNForm></FRNForm>}

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
