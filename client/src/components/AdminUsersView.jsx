import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Swal from "sweetalert2";
import {  EditUserContext } from "../Context/AuthPageContext";

import EditUser from "../components/AdminUsers/EditUser";



const AdminUsersView = () => {

  const [allUsers, setAllUsers] = useState([]);
  // const { editUser, setEditUser } = useContext(EditUserContext);
  const localstore = localStorage.getItem("click"); //dd
  const token = JSON.parse(localstore).token; //dd
  const [state, setState] = useState(false);
  const { editUser, setEditUser } = useContext(EditUserContext);
  const [userData, setuserData] = useState([]);




  useEffect(() => {
    axios.get("/admin/usersData").then((response) => {
      console.log(response.data.users);
      setAllUsers(response.data.users);
    });
  }, [state,editUser]);


  const BlockUser = (_id) => {
    try {
      const config = {
        headers: {
          token: token,
        },
      };

      Swal.fire({
        title: "Do you Want to block?",
        showDenyButton: true,
        confirmButtonText: "yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.patch(
            "/admin/blockUser",

            {
              _id: _id,
            },
            config
          );

          setState(state ? false : true);
        }
      });
    } catch (error) {}
  };

  const UnBlockUser = (_id) => {
    try {
      const config = {
        headers: {
          token: token,
        },
      };

      Swal.fire({
        title: "Do you Want to Unblock this user?",
        showDenyButton: true,
        confirmButtonText: "yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.patch(
            "/admin/unBlockUser",

            {
              _id: _id,
            },
            config
          );
          console.log(data);
          setState(state ? false : true);
        }
      });
    } catch (error) {}
  };

  // -----------------------------------------------------------
  const deleteUser = (_id) => {
    try {
      const config = {
        headers: {
          token: token,
        },
      };

      Swal.fire({
        title: "Do you Want to Delete this user?",
        showDenyButton: true,
        confirmButtonText: "yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.patch(
            "/admin/deleteUSer",

            {
              _id: _id,
            },
            config
          );
          console.log(data);
          setState(state ? false : true);
        }
      });
    } catch (error) {}
  };
  // ---------------------------------------------------------


  return (
    <div className='ml-16 mt-20 '>
      <table className='shadow-2xl font-[Poppins] border-2 border-cyan-200 w-6/12 '>
        <thead className='text-white '>
            <tr>
              <th className='py-3 bg-cyan-800'>I.D</th>
              <th className='py-3 bg-cyan-800'>Name</th>
              <th className='py-3 bg-cyan-800'>Email</th>
              <th className='py-3 bg-cyan-800'>Contact</th>
              <th className='py-3 bg-cyan-800'>Edit</th>
              <th className='py-3 bg-cyan-800'>Delete</th>
              <th className='py-3 px-3 bg-cyan-800'>Block/UnBlock</th>
            </tr>
        </thead>
        <tbody className='text-cyan-900 text-center'>
        { allUsers.map((user,index)=> ( 
            
          <tr className='bg-cyan-200 cursor-pointer duration-300'>
            <td className='py-3 px-6'>{index+1}</td>
            <td className='py-3 px-6'>{user.name}</td>
            <td className='py-3 px-6'>{user.email}</td>
            <td className='py-3 px-6'>{user.mobile}</td>
            {/* <td className='py-3 px-6'>Edit</td> */}
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">

{/* ---------------------------------  Edit button --------------- */}

                            <a
                              onClick={() => {
                                setEditUser(true);
                                setuserData(user);
                                console.log(editUser);
                              }}
                              className="text-red-500  hover:text-red-700 cursor-pointer"
                            >
                              Edit
                            </a>
                          </td>
            {/* <td className='py-3 px-6'>Delete</td> */}

            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
 

                            <a
                              onClick={
                                ()=>{
                                  deleteUser(user._id)
                                }
                              }
                              className="text-red-500  hover:text-red-700 cursor-pointer"
                            >
                              Delete  
                            </a>
                          </td>

            {/* <td className='py-3 px-6'>Block</td> */}
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            {user.status ? (
                              <a
                                className="text-red-500  hover:text-red-700 cursor-pointer"
                                onClick={() => {
                                  BlockUser(user._id);
                                  setState(false);
                                }}
                              >
                                Block
                              </a>
                            ) : (
                              <a
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                onClick={() => {
                                  UnBlockUser(user._id);
                                  setState(true);
                                }}
                              >
                                Unblock
                              </a>
                            )}
                          </td>
          </tr>

        ))}


        </tbody>

      </table>

      {/* ------------------edit modal outside of the map ------------------------ */}

      {editUser ? <EditUser data={userData} /> : null}
      
    </div>
  )
}

export default AdminUsersView