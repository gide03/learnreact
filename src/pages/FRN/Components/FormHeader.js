import styled from "styled-components";

const Header = styled.div`
  background-color: #026dc9;
  width: 100%;
  display: flex;
  padding-left: 1rem;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  h1 {
    font-size: 1em;
    /* color: #efefef; */
  }
`;

const FormHeader = (props) => {
  return (
    <Header>
      <h1>{props.title}</h1>
    </Header>
  );
};

export default FormHeader;
