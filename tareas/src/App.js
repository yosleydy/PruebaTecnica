import './App.css';
import Index from "./pages/index";
import {BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Index/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
