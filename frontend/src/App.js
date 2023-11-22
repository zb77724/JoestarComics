import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from './components/Layout';
import { RequireAuth } from './components/RequireAuth';
import { Homepage } from './components/Homepage';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { ProductForm } from './components/ProductForm';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>

          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="category/:name" element={<Homepage />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          {/* Protected Routes: Customer-only */}
          <Route element={<RequireAuth role="customer" />}>
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Protected Routes: Administrator-only */}
          <Route element={<RequireAuth role="admin" />}>
            <Route path="products/upload" element={<ProductForm />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
};

export default App;