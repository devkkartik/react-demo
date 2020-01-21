import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  card: {
    display: "flex",
    marginTop: "20px"
  },
  deleteButton: {
    marginLeft: "auto"
  }
};

class CartItem extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      cartItem: { title, createdOn, userHandle }
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1" color="textSecondary">
            {dayjs(createdOn).fromNow()}
          </Typography>
          <Typography variant="body2">Added by: {userHandle}</Typography>
        </CardContent>
        <CardActions className={classes.deleteButton}>
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={() => this.props.onDelete(this.props.cartItem.cartItemId)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CartItem);
