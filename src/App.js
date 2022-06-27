import './App.css';
import React  from 'react';
import UrlGenerator from './main/UrlGenerator'
import { BrowserRouter } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <UrlGenerator></UrlGenerator>
      </div>
    );
  }

} 

export default App;
