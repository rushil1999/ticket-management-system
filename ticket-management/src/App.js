import logo from './logo.svg';
import './App.css';
import TicketList from './components/TicketList';
import TicketParent from './components/TicketParent';
import {
  BrowserRouter as Router,  
  Routes,
  Route,
  Link
} from "react-router-dom";
import TicketDetails from './components/TicketDetails';

function App() {
  return (

    <Router>
        <Routes>
          <Route path="/tickets" element={<TicketList />}>
          </Route>
          <Route path="/ticket/:id" element={<TicketDetails />}>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>