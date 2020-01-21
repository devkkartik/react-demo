import React, { Component } from "react";
import axios from "axios";

// MUI
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import CartItem from "../components/CartItem";

class home extends Component {
  state = {
    isLoaded: false,
    cartItems: null
  };

  componentDidMount() {
    fetch(
      "https://europe-west2-sandbox-253814.cloudfunctions.net/api/getCartItems"
    )
      .then(response => response.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            cartItems: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleDelete = cartItemId => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      this.setState({ isLoaded: false });

      // service hit for delete
      axios
        .delete(
          `https://europe-west2-sandbox-253814.cloudfunctions.net/api/deleteCartItem/${cartItemId}`
        )
        .then(res => {
          console.log(res.data);
          const cartItems = this.state.cartItems.filter(
            ci => ci.cartItemId !== cartItemId
          );
          this.setState({ isLoaded: true, cartItems });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  render() {
    let shoppingListMarkup =
      this.state.cartItems && this.state.isLoaded ? (
        this.state.cartItems.map(item => (
          <CartItem
            key={item.cartItemId}
            cartItem={item}
            onDelete={this.handleDelete}
          />
        ))
      ) : (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <CircularProgress size={30} />
          <br />
          <Typography variant="caption">Loading...</Typography>
        </div>
      );

    return (
      <Grid container spacing={2}>
        <Grid item sm={2} xs={12}></Grid>
        <Grid item sm={8} xs={12}>
          {shoppingListMarkup}
        </Grid>
        <Grid item sm={2} xs={12}></Grid>
      </Grid>
    );
  }
}

export default home;
