import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components
import NavBar from "./components/NavBar";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import add from "./pages/add";

// MUI
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightGreen[500],
      main: lightGreen[800],
      dark: lightGreen[900],
      contrastText: "#fff"
    },
    secondary: {
      light: lightGreen[500],
      main: lightGreen[800],
      dark: lightGreen[900],
      contrastText: "#000"
    }
  }
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/add" component={add} />
              </Switch>
            </Container>
          </React.Fragment>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
