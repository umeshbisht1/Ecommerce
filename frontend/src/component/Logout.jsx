import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutFailure,logoutStart,logoutSuccess } from '../Store/createslice.js';
function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data=useSelector(state=>state.currentUser?.data)
  
  if (data) {
    (async () => {
     dispatch(logoutStart())
      try {
        const data = await axios.post("/api/v1/logout");
        dispatch(logoutSuccess(data))
       
      } catch (error) {
        dispatch(logoutFailure(error.mesage))
        console.log("error|| u are not logined in");
      }
    }

    )();
  }
  else
   {
    navigate("/");
   }
  return (
    <div>
      <h3>you rae not logged in please login::</h3>
      <Link to='/login' className='p-[10px] border-[1px] bg-[lightseagreen] '> Click her to login </Link>
    </div>
  )
}

export default Logout
