import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Login/SignUp';
import CollectionRequestsTable from './Components/Requests/AllRequests';
import FeaturedProducts from './Components/FeaturedProducts';

function App() {

  return (
        <div className='-ml-84 -mt-8 min-h-screen min-w-screen flex flex-col bg-green-400'>
          <Routes>
          <Route path='/' element={<><Home /></>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/request' element={<CollectionRequestsTable />}/>
        </Routes>
        </div>
  );
}

export default App;
