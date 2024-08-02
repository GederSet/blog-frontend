import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AddPost from './pages/AddPost'
import ErrorPage from './pages/ErrorPage'
import FullPost from './pages/FullPost'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { userApi } from './services/UserService'

function App() {
  const {} = userApi.useGetMeQuery({})

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='add-post' element={<AddPost />} />
        <Route path='post/:id' element={<FullPost />} />
        <Route path='post/:id/edit' element={<AddPost />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Registration />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default App
