import styled from "styled-components";
import { useContext, useEffect } from "react";
import FormContext from "../FormContext";
import SidebarContext from "../Context/SidebarContext";
import FormHeader from "./FormHeader";

const BasicFormContainer = styled.div`
  width: 98%;
  border: 1px solid #bbbbbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.3rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  table {
    font-size: 0.7rem;
    width: 90%;
  }

  th {
    text-align: left;
  }
  td {
    width: 70%;
    input,
    select {
      font-size: 0.7rem;
      width: 100%;
      text-align: center;

      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box; /* Opera/IE 8+ */
    }
  }
`;

const FormBasicInfo = () => {
  const {
    setProjectName,
    imageTitle,
    setImageTitle,
    setReleaseDate,
    NLRSignature,
    setNLRSignature,
    NLR2Signature,
    setNLR2Signature,
    LRSignature,
    setLRSignature,
  } = useContext(FormContext);

  const { projectlist } = useContext(SidebarContext);

  useEffect(() => {
    setProjectName(projectlist[0]);
  }, [projectlist, setProjectName]);
  return (
    <BasicFormContainer>
      <FormHeader title="Basic Information"></FormHeader>
      <table>
        <tbody>
          <tr>
            <th>Project Name</th>
            <td>
              <select onChange={(e) => setProjectName(e.target.value)}>
                {projectlist.map((name) => (
                  <option value={name} key={`option-${name}}`}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <th>Subject</th>
            <td>
              <input
                type="text"
                id="image-title"
                name="image-title"
                defaultValue={imageTitle}
                onKeyUp={(e) => setImageTitle(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          {/* <tr>
            <th>Image Subtitle</th>
            <td>
              <input
                type="text"
                id="image-subtitle"
                name="image-subtitle"
                defaultValue={imageSubtitle}
                onKeyUp={(e) => setImageSubtitle(e.currentTarget.value)}
              ></input>
            </td>
          </tr> */}
          <tr>
            <th>Release date</th>
            <td>
              <input
                type="date"
                id="release-date"
                name="release-date"
                onChange={(e) => setReleaseDate(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>NLR Sign.</th>
            <td>
              <input
                type="text"
                id="NLR-signature"
                name="NLR-signature"
                defaultValue={NLRSignature}
                onKeyUp={(e) => setNLRSignature(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>NLR2 Sign.</th>
            <td>
              <input
                type="text"
                id="NLR2-signature"
                name="NLR2-signature"
                defaultValue={NLR2Signature}
                onKeyUp={(e) => setNLR2Signature(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>LR Sign.</th>
            <td>
              <input
                type="text"
                id="LR-signature"
                name="LR-signature"
                defaultValue={LRSignature}
                onKeyUp={(e) => setLRSignature(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </BasicFormContainer>
  );
};

export default FormBasicInfo;
