import './App.css';
import TicketList from './components/TicketList';
import {
  BrowserRouter as Router,  
  Routes,
  Route,
} from "react-router-dom";
import TicketDetails from './components/TicketDetails';
import { APPLICATION_TITLE } from './services/constants';

function App() {
  document.title = APPLICATION_TITLE;
  return (

    <Router>
        <Routes>
          <Route path="/" element={<TicketList />}/>
          <Route path="/ticket/:id" element={<TicketDetails />}/>
        </Routes>
    </Router>
  );
}

export default App;