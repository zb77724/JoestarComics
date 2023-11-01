import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Anouncements from './components/Anouncements';
import ProductDetails from './components/ProductDetails';
import SignUp from './components/SignUp';
import RequireAuthorization from './components/RequireAuthorization';
import History from './components/History';
import Profile from './components/Profile';
import UserForm from './components/UserForm';
import ProductForm from './components/ProductForm';
import PostAnouncement from './components/PostAnouncement';
import Analytics from './components/Analytics';

const App = () => {
  <Router>
    <Routes>
      <Route element={ <Layout /> }>

        {/* Public Routes */}
        <Route path="/" element={ <Homepage /> } />
        <Route path="anouncements" element={ <Anouncements /> } />
        <Route path="productDetails" element={ <ProductDetails /> } />
        <Route path="signup" element={ <SignUp /> } />

        {/* Routes which are only accessible by customers */}
        <Route element={ <RequireAuthorization role="customer" /> }>
          <Route path="history" element={ <History />} />
          <Route path="profile" element={ <Profile />} />
          <Route path="shippingForm" element={ <ShippingForm />} />
        </Route>

        {/* Routes which are only accessible by administrators */}
        <Route element={ <RequireAuthorization role="admin" /> }>
          <Route path="uploadUser" element={ <UserForm /> } />
          <Route path="uploadProduct" element={ <ProductForm /> } />
          <Route path="postAnouncement" element={ <PostAnouncement />} />
          <Route path="analytics" element={ <Analytics /> } />
        </Route>
      </Route>

    </Routes>
  </Router>
};

export default App;