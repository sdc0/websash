import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Student from './pages/Student/Student';
import BadgePage from './pages/Badge/Badge';
import IssuerPage from './pages/Issuer/Issuer';

import Header from './components/Header/Header';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student" element={<Student />} />
                <Route path="/issuer" element={<IssuerPage />} />
                <Route path="/badge/:badgeId" element={<BadgePage />} />
            </Routes>
        </div>
    );
}

export default App;
