import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import store from '../../store/store';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

function UserProfile(props) {
  const { classes } = props;

  const [user, setUser] = React.useState(store.getState().data.user);

  const handleChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="email"
                    label="Email"
                    onChange={handleChange('email')}
                    value={user.email}
                    className={classes.textField}
                    margin="normal"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="first-name"
                    label="First Name"
                    onChange={handleChange('firstName')}
                    value={user.firstName}
                    className={classes.textField}
                    margin="normal"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="last-name"
                    label="Last Name"
                    onChange={handleChange('lastName')}
                    value={user.lastName}
                    className={classes.textField}
                    margin="normal"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button disabled color="info">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(UserProfile);
