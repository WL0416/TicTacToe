import React from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Contact from "../Contact";

const PopUp = (props) => {
  const { popupTitle, popupContent } = props;

  //  console.log(popupTitle, popupContent);

  /* eslint-disable */
  return (
    <Popup trigger={<a>{popupTitle}</a>} modal nested>
      {(close) => {
        if (popupTitle === "contact us")
          return (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header">CONTACT US </div>
              <div className="content">
                <div className="container">
                  <Contact contactApi={popupContent} />
                </div>
              </div>
            </div>
          );
        else
          return (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header">{popupContent.$.pg_name} </div>
              <div className="content">
                <div className="container">
                  <div dangerouslySetInnerHTML={{ __html: popupContent._ }} />
                </div>
              </div>
            </div>
          );
      }}
    </Popup>
  );
};
/* eslint-disable */
PopUp.propTypes = {
  pageTitle: PropTypes.string,
  popupContent: PropTypes.any,
};

export default PopUp;
