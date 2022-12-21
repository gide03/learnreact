import styled, { ThemeProvider } from "styled-components";
import SidebarContext from "../Context/SidebarContext";
import { React, useContext, useState } from "react";
import ProjectItem from "./ProjectItem";

/**
 * Expected to placed inside side bar
 */
const Container = styled.div`
  /* display: flex; */
  /* flex-direction: ${(props) => props.direction}; */
  width: 100%;
  justify-content: space-around;
`;
Container.defaultProps = {
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
      <Container>
        {projectlist.map((project, index) => (
          <ProjectItem
            key={`project-ProjectItem-${index}`}
            projectname={project}
          ></ProjectItem>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default ItemGroup;
