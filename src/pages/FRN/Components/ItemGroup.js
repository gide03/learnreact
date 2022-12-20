import styled, { ThemeProvider } from "styled-components";
import SidebarContext from "../Context/SidebarContext";
import { React, useContext } from "react";
import ProjectItem from "./ProjectItem";

/**
 * Expected to placed inside side bar
 */
const Item = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  width: 100%;
  justify-content: space-around;
`;
Item.defaultProps = {
  direction: "column",
};

/**
 *
 * @param {true | false} props.direction
 * @param {}
 * @returns react component
 */
const ItemGroup = (props) => {
  const { projectlist } = useContext(SidebarContext);
  const mTheme = {
    direction: props.direction,
  };

  return (
    <ThemeProvider theme={mTheme}>
      {projectlist.map((project, index) => (
        <ProjectItem
          key={`project-ProjectItem-${index}`}
          projectname={project}
        ></ProjectItem>
      ))}
    </ThemeProvider>
  );
};

export default ItemGroup;
