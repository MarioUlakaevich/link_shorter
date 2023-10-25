import React, {useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route, Navigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {Navbar} from './components/Navbar'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import 'materialize-css'


function App() {

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      const newUserId = uuidv4();
      sessionStorage.setItem('userId', newUserId);
    }
  }, []);
  
  return (
    
    <Router>
      {<Navbar/>}
      <div className="container">
        <Routes >
          <Route path="/links" element={<LinksPage/>}>
            
          </Route>
          <Route path="/create" element={<CreatePage/>}>
            
          </Route>
          <Route path="/detail/:id" element={<DetailPage />}>
            
          </Route>
          <Route path="/" element={<Navigate to="/create"/>}>

          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App