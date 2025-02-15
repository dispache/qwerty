import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import SignUp from './components/Auth/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/auth/sign-up' element={ <SignUp /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
