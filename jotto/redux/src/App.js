import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

import GuessedWords from "./GuessedWords"
import Congrats from './Congrats'

class App extends Component {
  render() {
    return (
      <div className="container">
      <h1>Jotto</h1>
        <Congrats success={true}/>
        <GuessedWords guessedWords={[
          {guessedWord: 'train', letterMatchCount: 3}
        ]}/>
      </div>
    );
  }
}

export default hot(module)(App);
