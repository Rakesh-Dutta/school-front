import React, { Component } from 'react';
import CreateStudent from './components/CreateStudent/CreateStudent';
import CreateKlass from './components/CreateKlass/CreateKlass';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Class Front</h1>
        <div>
        <table>
        <tbody>
          <tr>
            <td width="500px"><CreateStudent host="http://localhost:9000"/></td>
            <td width="30px"></td>
            <td width="500px"><CreateKlass/>  </td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default App;