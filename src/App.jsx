import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./components/form/AddProduct";
import Categories from "./pages/Category";
import AddCategory from "./components/form/AddCategory";
import Brands from "./pages/Brand";
import AddBrand from "./components/form/AddBrand";
import Orders from "./pages/Orders";
import Clients from "./pages/Clients";
import AddClient from "./components/form/AddClient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* Product Routes */}
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />

          {/* Category Routes */}
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<AddCategory />} />

          {/* Brand Routes */}
          <Route path="brands" element={<Brands />} />
          <Route path="brands/add" element={<AddBrand />} />

          {/* Order Routes */}
          <Route path="orders" element={<Orders />} />

          {/* Client Routes */}
          <Route path="clients" element={<Clients />} />
          <Route path="clients/add" element={<AddClient />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
