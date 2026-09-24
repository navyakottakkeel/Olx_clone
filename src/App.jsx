import React from 'react'
import { useState } from 'react'
import Login from './components/Modal/Login';
import Navbar from './components/Navbar/Navbar'
import { useAuth } from './context/AuthContext';

const App = () => {

  const [openModal, setModal] = useState(false);

  const {user} = useAuth();
  console.log('Current User : ', user)

  const toggleModal = () => setModal(!openModal)

  return (
    <div>
      <Navbar toggleModal = {toggleModal} />
    <Login toggleModal = {toggleModal} status = {openModal} />
    </div>
  )
}

export default App
