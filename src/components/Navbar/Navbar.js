import { useState } from "react";
import styles from "./navbar.module.css";
import mailico from "./mail.svg";

const Navbar = (props) => {
  const [flagTheme, setFlagTheme] = useState(true);

  window.addEventListener("scroll", (event) => {
    try {
      let offsetH = document.getElementById("header").offsetHeight;
      if (window.scrollY >= offsetH) {
        if (flagTheme === true) {
          setFlagTheme(false);
        }
      } else if (window.scrollY < offsetH) {
        if (flagTheme === false) {
          setFlagTheme(true);
        }
      }
    } catch {}
  });

  return (
    <>
      <div
        id="navbar"
        className={`${styles.main} ${flagTheme ? styles.navbarLightTheme : ""}`}
      >
        <div className={`${styles.navbarContentWrapper}`}>
          <div>Logo dan Home</div>

          <ul>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">Profile</a>
            </li>
          </ul>

          <img src={mailico} width="40px"></img>
        </div>
      </div>
    </>
  );
};
export default Navbar;
