import React from 'react'
import AdminUsersView from '../components/AdminUsersView'
import AdminHome from '../components/AdminHome'


const AdminUsersPage = () => {
  return (
    <div className='flex flex-row'>
        <AdminHome/>
        {/* <AdminUsersView/> */}
    </div>
  )
}

export default AdminUsersPage