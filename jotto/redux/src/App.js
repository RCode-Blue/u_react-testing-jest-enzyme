import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import { getSecretWord } from "./actions";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import Congrats from "./Congrats";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, secretWord, guessedWords } = state;
  return { success, secretWord, guessedWords };
};

export default connect(mapStateToProps, { getSecretWord })(App);
