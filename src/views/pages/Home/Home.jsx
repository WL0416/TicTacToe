import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { homeContent } = props;

  const pgName = homeContent.$.pg_name;
  const buttons = homeContent.btns;
  const txt = homeContent.txt[0];
  // console.log(pgName, buttons, txt);

  return (
    <div id="Txt_page">
      <div id="page-container">
        <h1>{pgName}</h1>

        <div dangerouslySetInnerHTML={{ __html: txt }} />

        <div className="btns">
          {buttons.map(function (b, i) {
            return (
              <Link to={b.b[0].$.u} key={i}>
                <button type="submit" className="button">
                  <span>
                    {b.b[0].$.txt} <span className="fa fa-caret-right"></span>
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  homeContent: PropTypes.any.isRequired,
};

export default Home;
