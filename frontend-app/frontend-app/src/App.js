import './App.css';
import {BrowserRouter,MemoryRouter, Route, Router, Routes} from 'react-router-dom';
import Login from './Components/Login';
import Logout from './Components/Logout';
import CustomerDashboard from './Components/CustomerDashboard';
import AdminDashboard from './Components/AdminDashboard';
import SignUp from './Components/SignUp';
import ViewFlights from './Components/ViewFlights';
import AddFlightsDetails from './Components/AddFlightsDetails';
import ViewPrice from './Components/ViewPrice';
import AddBooking from './Components/AddBooking';
import Payment from './Components/Payment';

function App() {
  return (
    <div className="App">

     {/* <BrowserRouter> */}
     <MemoryRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/customer' element={<CustomerDashboard/>}></Route>
        <Route path='/admin' element={<AdminDashboard/>}></Route>
        <Route path='/addflights' element={<AddFlightsDetails/>}></Route>
        <Route path='/viewflights' element={<ViewFlights/>}></Route>
        <Route path='/ViewPrice' element={<ViewPrice/>}></Route>
        <Route path='/AddBooking' element={<AddBooking/>}></Route>
        <Route path='/Payment' element={<Payment/>}></Route>


      </Routes>
      </MemoryRouter>
      {/* </BrowserRouter> */}


 
    </div>
  );
}

export default App;
