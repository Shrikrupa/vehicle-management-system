import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import DisplayVehicle from './components/Vehicle/DisplayVehicle';
import Dashboard from './components/Dashboard/Dashboard';
import EditVehicle from './components/Vehicle/EditVehicle';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/home' element={<Dashboard />} />
        <Route path='/view' element={<DisplayVehicle />} />
        <Route path='/view/:id' element={<EditVehicle />} />
      </Routes>
    </>
  );
}

export default App;
