import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Login/SignUp';
import CollectionRequestsTable from './Components/Requests/AllRequests';
import ContactUs from './Components/ContactUs';
import AboutUs from './Components/AboutUs';

function App() {

  return (
        <div className='flex flex-col bg-green-400'>
          <Routes>
          <Route path='/' element={<><Home /></>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/request' element={<CollectionRequestsTable />}/>
          <Route path='/Contact-us' element={<ContactUs />} />
          <Route path='/About-Us' element={<AboutUs />} />
        </Routes>
        </div>
  );
}

export default App;
