import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import HTMLScraper from './components/extractor';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HTML Tag Counter</h2>
        </div>

        <p className="App-intro">
          Extract the HTML page source code of any websites and count the number of each HTML tag. Just type in the URL!
        </p>
        
        <HTMLScraper /> 
      </div>
    );
  }
}

export default App;
