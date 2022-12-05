import LoginPage from "./pages/LoginPage";
import React, { useState } from 'react'
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import { AuthPageContext, EditUserContext, AddUserContext } from './Context/AuthPageContext'

import SignUpPage from "./pages/SignUpPage";
import AdminLogin from "./components/AdminLogin";
import HomePage from "./pages/HomePage";
import { AppContext } from './Context/AppContext'
import { AdminHomePage } from "./pages/AdminHomePage";
import AdminUsers from "./components/AdminUsersView";
import AdminSeatingView from "./components/AdminSeatingView";
import StatusPage from "./pages/StatusPage";
import ApplicationForm from "./components/ApplicationForm";
import HomeContent from '../src/components/HomeContent'
import AdminViewApplication from "./components/AdminViewApplication";
import ASubmittedApplications from "./components/ASubmittedApplications";
import AdminApprovals from "./components/AdminApprovals";


function App() {

  const [appContext, setAppContext] = useState({
    showuser: false,
    showlogin: true,
    list: []
  })
  const [editUser, setEditUser] = useState(false)
  const [appStatus, setAppstatus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAssignSeat, setShowAssignSeat] = useState(false)
  return (
    <>
      <AuthPageContext.Provider value={{ appStatus, setAppstatus, showModal, setShowModal, showAssignSeat, setShowAssignSeat }}>

          <EditUserContext.Provider value={{ editUser, setEditUser }}>
        <AppContext.Provider value={{ appContext, setAppContext }} >
            <AddUserContext.Provider value={{ showAddUser, setShowAddUser }}>


              <Router>

                <Routes>
                  <Route exact path='/' element={<HomePage />}>
                    {/* <Route exact path='/' element={ <HomePage/> }/> */}

                    <Route exact path='home' element={<HomeContent />} />
                    <Route exact path='application' element={<ApplicationForm />} />
                    <Route exact path="status" element={<StatusPage />} />
                  </Route>


                  <Route exact path='/signin' element={<LoginPage />} />
                  <Route exact path='/signup' element={<SignUpPage />} />


                  <Route exact path='/adminlogin' element={<AdminLogin />} />
                  <Route exact path='/admin' element={<AdminHomePage />}>
                    {/* <Route index element={<AdminDash/>}/> */}

                    {/* <Route path='home' /> */}
                    <Route path='dashboard' element={<ASubmittedApplications />} />
                    <Route path='user' element={<AdminUsers />} />
                    <Route path='approval-req' element={<AdminApprovals />} />
                  </Route>


                </Routes>
              </Router>

            </AddUserContext.Provider>
        </AppContext.Provider>
          </EditUserContext.Provider>
      </AuthPageContext.Provider>

    </>

  );
}

// npm i express mongoose dotenv cors

export default App;
