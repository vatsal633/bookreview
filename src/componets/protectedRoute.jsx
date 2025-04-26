import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const protectedRoute = ({ children }) => {
    const {username} = useParams()
   
    const storedToken = JSON.parse(localStorage.getItem("token"))

    if(!storedToken || storedToken.name!=username){
        return <Navigate to="/login" replace />;
    }

    return children
}

export default protectedRoute