import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../../static/image/tic_tac_toe.png";

const Header = (props) => {
  const { headerContent, mainMenu } = props;

  const headLogo = headerContent[0].head_l_logo[0].$;
  const siteTitle = headerContent[0].site_title[0].$;
  const menu = mainMenu[0].pages[0].p;

  // console.log(headLogo, siteTitle, menu);

  return (
    <header id="main_header">
      <div id="brand">
        <div className="container">
          <Link to={headLogo.u} className="logo-tl">
            <img src={Logo} alt="logo" />
          </Link>
          <Link to={siteTitle.u} className="main-site-name">
            {siteTitle.txt}
          </Link>

          <nav>
            <ul>
              {menu.map(function (p, i) {
                return (
                  <li key={i}>
                    <Link to={p.$.u}>
                      <i
                        className={"fa fa-2x " + p.$.ico}
                        aria-hidden="true"
                      ></i>
                      {p.$.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  headerContent: PropTypes.any.isRequired,
  mainMenu: PropTypes.any,
};

export default Header;
