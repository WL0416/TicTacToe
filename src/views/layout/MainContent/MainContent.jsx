import React from "react";
import PropTypes from "prop-types";

const MainContent = (props) => {
  return (
    <div id="main_content">
      <div className="main_container">{props.children}</div>
    </div>
  );
};

MainContent.propTypes = {
  children: PropTypes.any,
};

export default MainContent;
