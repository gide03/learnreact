import { useRef, useContext } from "react";
import styled from "styled-components";
import FormContext from "../FormContext";
import FormHeader from "./FormHeader";

async function getHash(algorithm, data) {
  const main = async (msgUint8) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
  };

  if (data instanceof Blob) {
    const arrayBuffer = await data.arrayBuffer();
    const msgUint8 = new Uint8Array(arrayBuffer);
    return await main(msgUint8);
  }
  const encoder = new TextEncoder();
  const msgUint8 = encoder.encode(data);
  return await main(msgUint8);
}

const FormContainer = styled.div`
  width: 98%;
  border: 1px solid #bbbbbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  margin-bottom: 0.3rem;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 10rem;
  border: 1px dashed black;
  background-color: rgb(187, 254, 255);
  padding: 1rem 0px 1rem 0px;
  margin-top: 0.2rem;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  h1 {
    text-align: center;
    font-size: 0.7rem;
    margin: auto;
  }
`;

const ToolBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #68b9ff;

  padding: 0.2rem 1rem 0.2rem 1rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  font-size: 0.7rem;
`;
const FilesContainer = styled.div`
  position: relative;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  width: 90%;
  min-height: 4rem;
  max-height: 10rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #68b9ff;
`;

const Card = styled.div`
  width: 99%;
  background-color: #dedede;
  color: black;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2em;

  padding: 0.2em 0.3em 0.2em 1rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  h1 {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    margin-top: -0.3em;
    font-size: 0.6rem;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const FileCard = (props) => {
  const filename = props.file.name;
  const sha256 = props.sha256;
  return (
    <Card>
      <div style={{ width: "70%" }}>
        <h1>{filename}</h1>
        <p>sha256: {sha256}</p>
      </div>
      <div>
        <button onClick={() => props.deleteElement(filename, props.idx)}>
          X
        </button>
      </div>
    </Card>
  );
};

const FormAttachment = () => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(FormContext);

  const appendFile = async (fileList) => {
    let _file_keys = [...files.keys];
    let _file_list = [...files.list];
    let _file_sha256 = [...files.sha256];

    for (let i = 0; i < Array.from(fileList).length; i++) {
      while (true) {
        const _key = `file_${Math.floor(Math.random() * 999)}`; // Make sure key is unique and update files queue
        if (!files.keys.includes(_key)) {
          _file_keys.push(_key);
          _file_list.push(fileList[i]);
          _file_sha256.push(await getHash("SHA-256", new Blob([fileList[i]])));
          break;
        }
      }
      setFiles({ keys: _file_keys, list: _file_list, sha256: _file_sha256 });
    }
  };
  const handlerDeleteElement = async (fname, fidx) => {
    const searchIndex = () => {
      let filenames = [];
      for (let i = 0; i < files.list.length; i++) {
        filenames.push(files.list[i].name);
      }
      return filenames.indexOf(fname);
    };

    const deleteIndex = searchIndex();
    const _sha256 = [...files.sha256].filter((x, idx) => idx !== deleteIndex);
    const _key = [...files.keys].filter((k, idx) => idx !== deleteIndex);
    const _list = [...files.list].filter((f, idx) => idx !== deleteIndex);
    setFiles({ keys: _key, list: _list, sha256: _sha256 });
  };

  return (
    <FormContainer>
      <FormHeader title="Attachment Form"></FormHeader>
      <DropZone>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Drag and Drop Files to Upload</h1>
          <h1>Or</h1>
        </div>
        <input
          type="file"
          accept="application/zip"
          multiple
          onChange={async (event) => appendFile(event.target.files)}
          hidden
          ref={inputRef}
        ></input>
        <button onClick={() => inputRef.current.click()}>Select Files</button>
      </DropZone>
      <FilesContainer>
        <ToolBar>
          <span>Attached Files</span>
          <button onClick={() => setFiles({ keys: [], list: [], sha256: [] })}>
            clear
          </button>
        </ToolBar>
        {files.keys.map((_key, idx) => (
          <FileCard
            key={_key}
            file={files.list[idx]}
            sha256={files.sha256[idx]}
            deleteElement={handlerDeleteElement}
            idx={_key}
          ></FileCard>
        ))}
      </FilesContainer>
    </FormContainer>
  );
};

export default FormAttachment;
