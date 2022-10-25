import LoginPage from "./pages/LoginPage";
import React, { useState } from 'react'
import {
  BrowserRouter as Router,Routes,
  Route
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import AdminLogin from "./components/AdminLogin";
import HomePage from "./pages/HomePage";
import Application from "./pages/Application";
import { AppContext } from './Context/AppContext'
import { AdminHomePage } from "./pages/AdminHomePage";
import AdminUsersPage from "./pages/AdminUsersPage";


function App() {

  const [appContext, setAppContext] = useState({
    showuser: false,
    showlogin: true,
    list: []
  })

  return (
    <>
      <AppContext.Provider value={{appContext,setAppContext}} >

      <Router>

        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/signin' element={<LoginPage/>}/>
          <Route exact path='/signup' element={<SignUpPage/>}/>
          <Route exact path='/adminlogin' element={ <AdminLogin/> }/>
          <Route exact path='/application' element={ <Application/> }/>
          {/* // booking status  '/status' */}
          <Route exact path='/admin' element={<AdminHomePage/>} />
          <Route exact path='/users' element={<AdminUsersPage/>} />
        </Routes>

      </Router>
      </AppContext.Provider>

    </>

  );
}

// npm i express mongoose dotenv cors

export default App;
