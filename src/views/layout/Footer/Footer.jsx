import React from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../../static/image/K_logo.png";
import PopUp from "../PopUp";
// import Contact from "../Contact";

const Footer = (props) => {
  const { footerContent, termsAndConditions, privacy, contactApi } = props;

  //   console.log(termsAndConditions, privacy);

  const footMsg = footerContent[0].foot_msg[0].$;
  const items = footerContent[0].items[0].i;
  const footRLogo = footerContent[0].foot_r_logo[0].$;

  //   console.log(footMsg, items, footRLogo);

  return (
    <footer>
      <div className="container">
        <nav>
          <ul>
            {items.map((it, i) => {
              if (it.$.tp === "ln") {
                switch (it.$.txt) {
                  case "terms and conditions":
                    return (
                      <li key={i}>
                        <PopUp
                          popupTitle={it.$.txt}
                          popupContent={termsAndConditions}
                        ></PopUp>
                      </li>
                    );
                  case "privacy":
                    return (
                      <li key={i}>
                        <PopUp
                          popupTitle={it.$.txt}
                          popupContent={privacy}
                        ></PopUp>
                      </li>
                    );
                  case "contact us":
                    return (
                      <li key={i}>
                        <PopUp
                          popupTitle={it.$.txt}
                          popupContent={contactApi}
                        ></PopUp>
                      </li>
                    );
                  default:
                    return null;
                }
              } else {
                return <li key={i}>{it.$.txt}</li>;
              }
            })}
          </ul>
        </nav>

        <div className="foot_message"> {footMsg.txt} </div>

        <a
          className="foot-r-logo"
          href={footRLogo.u}
          target={footRLogo.t}
          rel="noopener noreferrer"
        >
          <img alt="footer logo" src={logo} />
        </a>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  footerContent: PropTypes.any.isRequired,
};

export default Footer;
