import { useState } from 'react'
import {
  Link,
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Courses from './Components/Couses/Courses';

const routes = [
  {
    path: '/', element: <div><Navbar></Navbar> <Homepage></Homepage></div>
  },
  {
    path: '/signin', element: <div><Signin></Signin></div>
  },
  {
    path: '/signup', element: <div><Signup></Signup></div>
  },
  {
    path: '/courses', element: <div><Navbar></Navbar><Courses></Courses></div>
  }
]

const location = new ReactLocation();

function App() {

  return (
    <Router
      location={location}
      routes={routes}
    >
      
      <Outlet />
    </Router>
  )
}

export default App
