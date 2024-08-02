import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

const MainLayout: React.FC = () => {
  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
