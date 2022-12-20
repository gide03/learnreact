import { React, useState, useContext } from "react";
import ItemGroup from "./Components/ItemGroup";
import ProjectItem from "./Components/ProjectItem";
import styled, { ThemeProvider } from "styled-components";
import SidebarContext from "./Context/SidebarContext";

const SideBarContainer = styled.div`
  /* position: sticky; */
  /* left: 0; */
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-top: 0;
`;
SideBarContainer.defaultProps = {
  width: "100%",
  top: "0",
};

/**
 *
 * @param {px} props.width for width
 * @param {px} props.top for margin top
 * @returns component
 */
const FRN_SideBar = (props) => {
  const [projectlist, setProjectList] = useState([
    "EM620",
    "EM620 VOC International 1",
    "EM620 VOC International 2",
  ]);
  const mTheme = {
    width: props.width,
    top: props.top,
  };

  const contextValue = { projectlist, setProjectList };
  return (
    <SidebarContext.Provider value={contextValue}>
      <ThemeProvider theme={mTheme}>
        <SideBarContainer>
          <ItemGroup></ItemGroup>
        </SideBarContainer>
      </ThemeProvider>
    </SidebarContext.Provider>
  );
};

export default FRN_SideBar;
