import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Home from './page/home'
import Navbar from './componets/navbar'
import Footer from "./componets/footer"
import BookDetails from './page/bookdetails'
import Profile from './page/profile' 
import Login from './page/auth/login'
import Signin from './page/auth/signin'
import BookListingPage from './page/booklisting'
import ProtectedRoute from './componets/protectedRoute'
import Admin from './page/admin'
import Reviewform from "./componets/reviewForm"


const router = createBrowserRouter ([
  {
    path:'/',
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:'/book/:bookname',
    element:<><Navbar/><BookDetails/></>
  },
  {
    path:'/login',
    element:<><Login/></>
  },
  {
    path:'/signin',
    element:<><Signin/></>
  },
  {
    path:"/books",
    element:<><Navbar/><BookListingPage/></>
  },

  {
    path:'/:bookname/review',
    element:<><Navbar/><Reviewform/></>
  },



  // protected routes
  {
    path:'/:username/profile',
    element:<><ProtectedRoute><Profile/></ProtectedRoute></>
  },

  {
    path:'/admin',
    element:<><Admin/></>
  }
  
])

function App() {
    return <RouterProvider router={router} />;
}

export default App
