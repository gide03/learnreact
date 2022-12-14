import styles from "./FileIO.module.css";
import uploadIco from "./logo192.png";
import { useState, useRef } from "react";
// import crossico from "./cross_ico.svg";
// import zipico from "./zip_ico.svg";

const FileCard = (props) => {
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
        onClick={() => props.deleteElement(props.filename)}
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
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  document.title = "File IO";

  const handleDrop = (event) => {
    event.preventDefault();
    const newList = [...files];
    newList.push(...event.dataTransfer.files);
    setFiles(newList);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const appendFile = (fileList) => {
    console.log("Files");
    console.log(files);
    console.log("File list:");
    console.log(fileList);
    const newList = [...files];
    console.log("New list before:");
    console.log(newList);
    newList.push(...fileList);
    console.log("New list after:");
    console.log(newList);
    setFiles(newList);
  };

  const handlerDeleteElement = (e) => {
    const newList = [...files].filter((file) => file.name !== e);
    setFiles(newList);
  };

  const uploadForm = async (m_form) => {
    const response = await fetch("http://localhost:5000/frn/file/upload", {
      method: "post",
      body: m_form,
    });

    console.log(response);
  };

  const handlerUploadData = () => {
    console.log("uploadData");
    let m_form = new FormData();
    m_form.append("coba 1", "hello world coba 1");
    m_form.append("coba 2", "hello world coba 2");
    uploadForm(m_form);
  };

  //   if (files.length > 0)
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
            // onChange={(event) => setFiles(event.target.files)}
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
            {Array.from(files).map((file, idx) => (
              <li key={idx}>
                <FileCard
                  filename={file.name}
                  deleteElement={handlerDeleteElement}
                  idx={idx}
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
