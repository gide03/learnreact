import { useContext } from "react";
import styled from "styled-components";
// import mStyle from "../frn.module.css";
import FormContext from "../FormContext";
import FormHeader from "./FormHeader";

const BasicFormContainer = styled.div`
  width: 98%;
  border: 1px solid #bbbbbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.3rem;

  padding: 0.2em 0px 0.3rem 0px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  textarea {
    resize: none;
    width: 96%;
    height: 15rem;
  }
  span {
    font-size: 0.6rem;
  }
`;

const FormImageDesc = () => {
  const { markdownText, setMarkdownText } = useContext(FormContext);
  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
  };

  return (
    <BasicFormContainer>
      <FormHeader title="Image Description"></FormHeader>
      <textarea
        defaultValue={markdownText}
        onKeyUp={(e) => onInputChange(e)}
      ></textarea>
      <span>Fill with markdown text</span>
    </BasicFormContainer>
  );
};

export default FormImageDesc;
