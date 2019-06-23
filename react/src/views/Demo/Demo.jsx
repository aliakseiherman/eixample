import React, { useState, useEffect } from "react";
import http from '../../helpers/axios-helper';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import lifecycle from 'react-pure-lifecycle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes, { object } from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import store from '../../store/store';
import toastr from '../../helpers/notification-helper';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function EditPersonDialog(props) {
  const classes = useStyles();
  const { onClose, person, ...other } = props;

  const [personEdited, setPersonEdited] = React.useState({ ...props.person });

  React.useEffect(() => {
    setPersonEdited(props.person);
  }, [props.person])

  function handleClose() {
    onClose();
  }

  function updateOrCreate() {
    if (person.id > 0) {
      http
        .post("Person/Update", {
          id: personEdited.id,
          name: personEdited.name,
          description: personEdited.description
        })
        .then(function (response) {
          toastr.success('Person Updated');
          handleClose();
        });
    } else {
      http
        .post("Person/Add", {
          name: personEdited.name,
          description: personEdited.description
        })
        .then(function (response) {
          toastr.success('Person Added');
          handleClose();
        });
    }
  }

  const handleChange = name => event => {
    setPersonEdited({ ...personEdited, [name]: event.target.value });
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">{person.id > 0 ? 'Update' : 'Add'} Person</DialogTitle>
      <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">

          <div>
            <TextField
              id="name"
              label="Name"
              onChange={handleChange('name')}
              value={personEdited.name}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="description"
              label="Description"
              type="textarea"
              onChange={handleChange('description')}
              value={personEdited.description}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              multiline
            />
          </div>

          <div>
            <Button variant="outlined" color="primary" className={classes.button} onClick={updateOrCreate}>{person.id > 0 ? 'Update' : 'Add'}</Button>
            <Button variant="outlined" color="default" className={classes.button} onClick={handleClose}>Close</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

EditPersonDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  personSelected: PropTypes.any
};

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
};

function Demo(props) {
  const [open, setOpen] = React.useState(false);
  const [person, setPerson] = React.useState({ id: 0, name: '', description: '' });
  const { classes } = props;

  function addPerson() {

    setPerson({ id: 0, name: '', description: '' });
    setOpen(true);
  }

  function editPerson(person) {
    setPerson(person);
    setOpen(true);
  }

  function deletePerson(person) {
    http
      .post("Person/Delete", {
        id: person.id
      })
      .then(function (response) {
        toastr.success('Person Deleted');
        loadPeople();
      });
  }

  const handleClose = value => {
    setOpen(false);
    loadPeople();
  };

  function loadPeople() {
    http
      .get("Person/GetAll")
      .then(function (response) {
        setPeople(response.data);
      });
  }

  let [people, setPeople] = useState([]);

  useEffect(() => {

    loadPeople();

  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>People</h4>
              <p>This page demonstrates audit functionality.</p>
              <p className={classes.cardCategoryWhite}>Using pgAdmin you can track changes made by the app. We are
                    dealing with <b>Persons</b> table.</p>
              <b />
              <p className={classes.cardCategoryWhite}>Create record and have a look at <b>CreationTime</b>, <b>CreatorID</b> and <b>TenantID</b>.</p>
              <p className={classes.cardCategoryWhite}>Modify record and have a look at <b>ModificationTime</b> and <b>ModifierID</b>.</p>
              <p className={classes.cardCategoryWhite}>Delete record and have a look at <b>DeletionTime</b> and <b>DeleterID</b>.</p>
              <br />
              <p className={classes.cardCategoryWhite}>Try switching between tenants ('subdomain1' and 'subdomain2') and see that
                  the
                    app only pulls records which belong to current tenant.</p>
              <br />
              <p className={classes.cardCategoryWhite}>Note that we've applied Dynamic Filter to avoid pulling soft-deleted
                    records.</p>
            </CardHeader>
            <CardBody>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="right">
                      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={addPerson}>
                        <AddIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {people.map(person => (
                    <TableRow key={person.id}>
                      <TableCell component="th" scope="person">
                        {person.id}
                      </TableCell>
                      <TableCell align="left">{person.name}</TableCell>
                      <TableCell align="left">{person.description}</TableCell>
                      <TableCell align="left">
                        <Fab color="default" aria-label="Edit" className={classes.fab} onClick={() => editPerson(person)}>
                          <Icon>edit_icon</Icon>
                        </Fab>
                      </TableCell>
                      <TableCell align="right">
                        <Fab aria-label="Delete" className={classes.fab} onClick={() => deletePerson(person)}>
                          <DeleteIcon />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <EditPersonDialog person={person} open={open} onClose={handleClose} />
    </div>
  );
}

const methods = {
  componentDidMount(props) {

  },
};

export default lifecycle(methods)(withStyles(styles)(Demo));
