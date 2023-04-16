import React from 'react'
import Home from './home'
import Cuisine from './cuisine'
import Searched from './Searched'
import Recipe from './recipe'
import Page404 from './Page404'
import {Route, Routes, useLocation} from 'react-router-dom'
// import { AnimatePresence } from 'framer-motion'
import Favorite from '../components/Favorite'
import Restaurant from './restaurant'
import Login from './Login'
import Register from './register'
import ReservationForm from '../components/ReservationForm'
import Reservation from './Reservation'
import HandleReservation from '../components/HandleReservations'
import AddMeal from '../components/AddMeal'
import Menu from './Menu'

function Pages({toggle, switcher}) {
  const home = switcher ?  <Restaurant /> : <Home toggle={toggle} />
  
  const location = useLocation()
  return (
    // <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={home} />
        <Route path='/home' element={home} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        {!switcher ?
          <>
            <Route path='/Favorite' element={<Favorite toggle={toggle} />} />
            <Route path='/cuisine/:type' element={<Cuisine toggle={toggle} />} />
            <Route path='/searched/:search' element={<Searched toggle={toggle} />} />
            <Route path="/recipe/:name" element={<Recipe/>} />  
          </>
          :
          switcher ?
          <>
            <Route path="/ReservationForm" element={<ReservationForm/>} />  
            <Route path="/Reservation" element={<Reservation/>} />  
            <Route path="/HandleReservation" element={<HandleReservation/>} />  
            <Route path="/AddMeal" element={<AddMeal/>} />  
            <Route path="/Menu" element={<Menu/>} />  
          </>
          : <></>
        }   
        <Route path='*' element={<Page404/>}  />
      </Routes>  
    // </AnimatePresence>
    
  )
}

export default Pages