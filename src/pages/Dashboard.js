import React from 'react'
import { AuthContext } from '../App'

const Dashboard = () => {
    const { user } = React.useContext(AuthContext);
  return (
    <div>{user}</div>
  )
}

export default Dashboard