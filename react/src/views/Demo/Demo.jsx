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

function EditItemDialog(props) {
  const classes = useStyles();
  const { onClose, item: item, ...other } = props;

  const [itemEdited, setItemEdited] = React.useState({ ...props.item });

  React.useEffect(() => {
    setItemEdited(props.item);
  }, [props.item])

  function handleClose() {
    onClose();
  }

  function updateOrCreate() {
    if (item.id > 0) {
      http
        .post("Item/Update", {
          id: itemEdited.id,
          name: itemEdited.name,
          description: itemEdited.description
        })
        .then(function (response) {
          toastr.success('Item Updated');
          handleClose();
        });
    } else {
      http
        .post("Item/Add", {
          name: itemEdited.name,
          description: itemEdited.description
        })
        .then(function (response) {
          toastr.success('Item Added');
          handleClose();
        });
    }
  }

  const handleChange = name => event => {
    setItemEdited({ ...itemEdited, [name]: event.target.value });
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">{item.id > 0 ? 'Update' : 'Add'} Item</DialogTitle>
      <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">

          <div>
            <TextField
              id="name"
              label="Name"
              onChange={handleChange('name')}
              value={itemEdited.name}
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
              value={itemEdited.description}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              multiline
            />
          </div>

          <div>
            <Button variant="outlined" color="primary" className={classes.button} onClick={updateOrCreate}>{item.id > 0 ? 'Update' : 'Add'}</Button>
            <Button variant="outlined" color="default" className={classes.button} onClick={handleClose}>Close</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

EditItemDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  itemSelected: PropTypes.any
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
  const [item, setItem] = React.useState({ id: 0, name: '', description: '' });
  const { classes } = props;

  function addItem() {

    setItem({ id: 0, name: '', description: '' });
    setOpen(true);
  }

  function editItem(item) {
    setItem(item);
    setOpen(true);
  }

  function deleteItem(item) {
    http
      .post("Item/Delete", {
        id: item.id
      })
      .then(function (response) {
        toastr.success('Item Deleted');
        loadItems();
      });
  }

  const handleClose = value => {
    setOpen(false);
    loadItems();
  };

  function loadItems() {
    http
      .get("Item/GetAll")
      .then(function (response) {
        setItems(response.data);
      });
  }

  let [items, setItems] = useState([]);

  useEffect(() => {

    loadItems();

  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <p>This page demonstrates audit functionality.</p>
              <p className={classes.cardCategoryWhite}>Using pgAdmin you can track changes made by the app. We are
                    dealing with <b>Items</b> table.</p>
              <b />
              <p className={classes.cardCategoryWhite}>Create record and have a look at <b>CreationTime</b>, <b>CreatorID</b> and <b>TenantID</b>.</p>
              <p className={classes.cardCategoryWhite}>Modify record and have a look at <b>ModificationTime</b> and <b>ModifierID</b>.</p>
              <br />
              <p className={classes.cardCategoryWhite}>Try switching between tenants ('subdomain1' and 'subdomain2') and see that
                  the
                    app only pulls records which belong to current tenant.</p>
            </CardHeader>
            <CardBody>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="right">
                      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={addItem}>
                        <AddIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell align="left">{item.name}</TableCell>
                      <TableCell align="left">{item.description}</TableCell>
                      <TableCell align="left">
                        <Fab color="default" aria-label="Edit" className={classes.fab} onClick={() => editItem(item)}>
                          <Icon>edit_icon</Icon>
                        </Fab>
                      </TableCell>
                      <TableCell align="right">
                        <Fab aria-label="Delete" className={classes.fab} onClick={() => deleteItem(item)}>
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

      {items.length > 0 && (
        <h6>Current database state:</h6>
      )}

      {items.map(item => (
        <pre>{JSON.stringify(item, null, 2)}</pre>
      ))}

      <EditItemDialog item={item} open={open} onClose={handleClose} />
    </div>
  );
}

const methods = {
  componentDidMount(props) {

  },
};

export default lifecycle(methods)(withStyles(styles)(Demo));
