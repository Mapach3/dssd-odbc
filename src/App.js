import React from 'react';
import './App.css';

import { Navigation } from './components/Navigation/index';


function App() {
  document.title = "Práctica ODBC"
  return (
    <div className="App">
      <Navigation/>

    </div>
  );
}

export default App;
