import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './Card.jsx'
import fotoPerfil from './tie_cat.webp'; 
import './App.css'

function App() {

  return (
    <>
      <Card foto = {fotoPerfil} nombre = {"Valery Nuñez"} dia = {17} mes = {6} anio = {2025} comments = {132} repost = {368} likes = {4300} saves = {538}/>
    </>
  )
}

export default App
