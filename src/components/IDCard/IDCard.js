import styles from "./idcard.module.css";
import profilePicture from "./gidion.jpg";
import githubIco from "./githubico.svg";
import linkedinIco from "./linkedinico.svg";

const IDCard = () => {
  return (
    <>
      <div className={`${styles.main}`}>
        <div className={`${styles.readMoreHeader}`}>
          <a href="" className={`${styles.btn}`}>
            About the Author
          </a>
        </div>
        <h1>Gidion Siwi Nugroho</h1>
        <div className={`${styles.authorContainer}`}>
          <img className={`${styles.authorImg}`} src={profilePicture}></img>
          <div className={`${styles.authorBio}`}>
            <h4>Firmware Engineer at Itron.inc</h4>
          </div>
          <ul>
            <li>
              <a href="https://github.com/gide03">
                <img src="https://www.svgrepo.com/show/327364/logo-github.svg"></img>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/gidion-siwi/">
                <img src="https://www.svgrepo.com/show/150731/linkedin-logo.svg"></img>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default IDCard;
