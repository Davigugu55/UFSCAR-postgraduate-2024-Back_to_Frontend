import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar';

function App() {
    return (
        <div className="d-flex">
            <CustomNavbar />
            <div className="flex-grow-1 p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/products/new" element={<ProductDetails />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
