import { Box } from '@mui/material';
import './App.css';
import Create from './Components/Create';
import Read from './Components/Read';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

export default function App() {
  return (
    <Box sx={{p:2}}>
    <Router>
    <Routes>
     
          <Route  index element={<Create />} />
          <Route  path='/read' element={<Read/>} />
        
    </Routes>
    </Router>
    </Box>
  );
}