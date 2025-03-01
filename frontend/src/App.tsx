import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
