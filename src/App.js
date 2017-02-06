import React, { Component } from 'react';
// import Sum from './components/Sum/Sum';
// import Box from './components/Box/Box';
import CreateStudent from './components/CreateStudent/CreateStudent';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Class Front</h1>
        <CreateStudent/>
        {/*<Sum/>
        <Sum/>
        <Sum/>
        <Box/>*/}
      </div>
    );
  }
}

export default App;