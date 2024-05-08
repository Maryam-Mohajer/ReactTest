import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from 'reactstrap';
import classnames from 'classnames';
import NavbarBookmarks from './NavbarBookmarks';
import NavBarLeft from './NavBarLeft/NavBarLeft';
import NavBarCenter from './NavBarCenter/NavBarCenter';
import { useUserAuth } from '../../../../../core/utils/context/AuthenticationContext';
import { profileContext } from '../../../../../core/utils/context/ProfileContext';
import { LoadProfile } from './LoadProfile';
import { OpenTicketing } from '../../../../../core/utils/open-ticketing.utils';

const ThemeNavbar = (props) => {
  const colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  const navbarTypes = ['floating', 'static', 'sticky', 'hidden'];

  const { role} = useUserAuth();

  const [rolesData, setRolesData] = useState([]);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    if (role) setRolesData(role);
  }, [role]);

  const { userProfilePicture, setUserProfilePicture, allowToRefetch, setAllowToRefetch } = useContext(profileContext);

  return (
    <React.Fragment>
      {allowToRefetch === 1 && <LoadProfile />}
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames('header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow', {
          'navbar-light': props.navbarColor === 'default' || !colorsArr.includes(props.navbarColor),
          'navbar-dark': colorsArr.includes(props.navbarColor),
          'bg-primary': props.navbarColor === 'primary' && props.navbarType !== 'static',
          'bg-danger': props.navbarColor === 'danger' && props.navbarType !== 'static',
          'bg-success': props.navbarColor === 'success' && props.navbarType !== 'static',
          'bg-info': props.navbarColor === 'info' && props.navbarType !== 'static',
          'bg-warning': props.navbarColor === 'warning' && props.navbarType !== 'static',
          'bg-dark': props.navbarColor === 'dark' && props.navbarType !== 'static',
          'd-none': props.navbarType === 'hidden' && !props.horizontal,
          'floating-nav':
            (props.navbarType === 'floating' && !props.horizontal) ||
            (!navbarTypes.includes(props.navbarType) && !props.horizontal),
          'navbar-static-top': props.navbarType === 'static' && !props.horizontal,
          'fixed-top': props.navbarType === 'sticky' || props.horizontal,
          scrolling: props.horizontal && props.scrolling,
        })}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content" style={{ position: 'relative' }}>
            <div
              className="navbar-collapse d-flex justify-content-center align-items-center"
              id="navbar-mobile"
              style={{ position: 'relative' }}
            >
              <div className="bookmark-wrapper navbar-menubar-wrapper">
                <div
                  className="d-none d-xl-block ticket-btn"
                  onClick={() => {
                    OpenTicketing();
                  }}
                >
                  ارسال تیکت
                </div>
                <NavbarBookmarks sidebarVisibility={props.sidebarVisibility} />
              </div>
              <NavBarCenter />
              <div className="bookmark-wrapper navbar-exit-wrapper">
                <NavBarLeft />
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default ThemeNavbar;
