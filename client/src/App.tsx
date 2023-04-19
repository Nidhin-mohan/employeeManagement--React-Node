// import React from 'react'
import * as React from 'react';

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddEmployee from './pages/AddEmployee';
import { ToastContainer } from 'react-toastify';
import Documents from './pages/Documents';
// import AddEmployee from './components/AddEmployee';

// import AddImage from './components/AddImage';
// import SharePointImage from './Image';
// import Documents from './components/Documents';


const App: React.FC = () => {
  return (
   <>
   <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/add-emplyee" element={<AddEmployee />} />     
      <Route path="/profile/documents/:id" element={<Documents />} />
     

    </Routes>
   </>
  )
}

export default App
