import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import { Link } from 'react-router-dom';

import store from '../../store/store';

class HeaderLinks extends React.Component {
  state = {
    notificationsOpen: false,
    profileOpen: false
  };

  handleToggleProfile = () => {
    this.setState(state => ({ profileOpen: !state.profileOpen }));
  };

  handleCloseProfile = event => {
    if (this.anchorElProfile.contains(event.target)) {
      return;
    }

    this.setState({ profileOpen: false });
  };

  handleToggleNotifications = () => {
    this.setState(state => ({ notificationsOpen: !state.notificationsOpen }));
  };

  handleCloseNotifications = event => {
    if (this.anchorElNotifications.contains(event.target)) {
      return;
    }

    this.setState({ notificationsOpen: false });
  };

  logout = event => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  render() {
    const { classes } = this.props;
    const { notificationsOpen, profileOpen } = this.state;
    // const { profileOpen } = this.state;

    store.subscribe(() => {
      if (store.getState().bus.text) {
        console.log(store.getState().bus.text);
      }
    });

    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorElNotifications = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={notificationsOpen ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggleNotifications}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={notificationsOpen}
            anchorEl={this.anchorElNotifications}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !notificationsOpen }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseNotifications}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleCloseNotifications}
                        className={classes.dropdownItem}
                      >
                        Mike John responded to your email
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotifications}
                        className={classes.dropdownItem}
                      >
                        You have 5 new tasks
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotifications}
                        className={classes.dropdownItem}
                      >
                        You're now friend with Andrew
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotifications}
                        className={classes.dropdownItem}
                      >
                        Another Notification
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotifications}
                        className={classes.dropdownItem}
                      >
                        Another One
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>

        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorElProfile = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={profileOpen ? "account-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggleProfile}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          <Poppers
            open={profileOpen}
            anchorEl={this.anchorElProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !profileOpen }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="account-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseProfile}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        <Link to={`/app/user`}>Profile</Link>
                      </MenuItem>
                      <MenuItem
                        onClick={this.logout}
                        className={classes.dropdownItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>


      </div >
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
