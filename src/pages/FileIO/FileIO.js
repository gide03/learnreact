import styles from "./FileIO.module.css";
import uploadIco from "./logo192.png";
import { useState, useRef } from "react";
// import crossico from "./cross_ico.svg";
// import zipico from "./zip_ico.svg";

const FileCard = (props) => {
  // console.log(props);
  return (
    <div className={`${styles.fileCard}`} id={`file-form-${props.idx}`}>
      <div style={{ width: "calc(100% - 40px)" }}>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td>
                {/* <input type="text" placeholder=""></input> */}
                <select>
                  <option value="IMFW">IMFW</option>
                  <option value="CMFW">CMFW</option>
                  <option value="OTA">OTA</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Filename</th>
              <td>{props.filename}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <textarea></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <button onClick={whoAmI}>Who am I</button> */}
      <button
        className={`${styles.deleteButton}`}
        onClick={() => props.deleteElement(props.filename, props.idx)}
      >
        <div className={`${styles.deleteIcon}`}>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

const FileIO = () => {
  const [files, setFiles] = useState({ keys: [], list: [] }); // ["keys":["file_<random>", ...],"files":[File, ...]]
  const inputRef = useRef();

  document.title = "File IO";

  const handleDrop = (event) => {
    event.preventDefault();
    appendFile(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const appendFile = (fileList) => {
    let _file_keys = [...files.keys];
    let _file_list = [...files.list];
    console.log(files);

    for (let i = 0; i < Array.from(fileList).length; i++) {
      while (true) {
        const _key = `file_${Math.floor(Math.random() * 999)}`; // Make sure key is unique and update files queue
        if (!files.keys.includes(_key)) {
          _file_keys.push(_key);
          _file_list.push(fileList[i]);
          break;
        }
      }
      setFiles({ keys: _file_keys, list: _file_list });
    }
  };

  const handlerDeleteElement = (fname, fidx) => {
    const _key = [...files.keys].filter((k, idx) => k !== fidx);
    const _list = [...files.list].filter((f) => f.name !== fname);
    setFiles({ keys: _key, list: _list });
  };

  const uploadForm = async (m_form) => {
    const response = await fetch("http://localhost:5000/frn/file/upload", {
      method: "post",
      body: m_form,
    });

    console.log(response);
  };

  const handlerUploadData = () => {
    let m_form = new FormData();
    m_form.append("coba 1", "hello world coba 1");
    m_form.append("file", files);
    uploadForm(m_form);
  };

  return (
    <>
      <div className={`${styles.MainContainer}`}>
        {/* {!files && ( */}
        <div
          className={`${styles.FileIOContainer}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <img
            alt="uploadicon"
            src={uploadIco}
            width="50px"
            height="50px"
          ></img>
          <h3>Drag and Drop Files to Upload</h3>
          <h3>Or</h3>
          <input
            type="file"
            accept="application/zip"
            multiple
            onChange={(event) => appendFile(event.target.files)}
            hidden
            ref={inputRef}
          ></input>
          <button onClick={() => inputRef.current.click()}>Select Files</button>
        </div>

        <div className={`${styles.fileCardWrapper}`}>
          <div className={`${styles.cardWrapperPanel}`}>
            <div>
              <label htmlFor="">Project Name </label>
              <input type="text" placeholder="Project Name"></input>
            </div>
            <button className={`${styles.closeButton}`}>Clear</button>
          </div>
          <ul>
            {files.keys.map((_key, idx) => (
              <li key={_key}>
                <FileCard
                  filename={files.list[idx].name}
                  deleteElement={handlerDeleteElement}
                  idx={_key}
                ></FileCard>
              </li>
            ))}
          </ul>

          <button
            className={`${styles.btSubmit}`}
            onClick={() => handlerUploadData()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default FileIO;
