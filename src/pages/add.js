import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center",
    marginTop: "20px"
  },
  pageTitle: {
    margin: "10px auto",
    fontSize: "2rem"
  },
  textField: {
    margin: "10px auto"
  },
  button: {
    marginTop: "20px",
    position: "relative"
  },
  progress: {
    position: "absolute"
  }
};

class add extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      loading: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const newCartItem = {
      title: this.state.title,
      userHandle: "kartik"
    };

    this.setState({
      loading: true
    });

    // service hit for add item
    axios
      .post(
        "https://europe-west2-sandbox-253814.cloudfunctions.net/api/createCartItem",
        newCartItem
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    const { errors, loading } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Add new item
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="title"
              name="title"
              type="text"
              label="New item"
              className={classes.textField}
              helperText={errors.title}
              error={errors.title ? true : false}
              value={this.state.title}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Add
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              Back to <Link to="/">home</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

add.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(add);
