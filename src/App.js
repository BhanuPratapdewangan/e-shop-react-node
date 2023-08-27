import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './component/nav';
import Footer from './component/footer';
import PrivateComponent from './component/PrivateComponent';
import SignUp from './component/signup';
import Login from './component/login';
import AddProduct from './component/AddProduct';
import ProductList from './component/productList';
import UpdateProduct from './component/updateProduct';
import Profile from './component/profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
        <Routes>
            <Route element={<PrivateComponent/>}>
              <Route path='/' element={<ProductList/>}></Route>
              <Route path='/add-product' element={<AddProduct/>}></Route>
              <Route path='/update-product/:id' element={<UpdateProduct/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>              
            </Route>

            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
