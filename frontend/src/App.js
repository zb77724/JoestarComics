import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Anouncements from './components/Anouncements';
import ProductDetails from './components/ProductDetails';
import SignUp from './components/SignUp';
import RequireAuthorization from './components/RequireAuthorization';
import History from './components/History';
import Profile from './components/Profile';
import ShippingForm from './components/ShippingForm';
import UserForm from './components/UserForm';
import ProductForm from './components/ProductForm';
import PostAnouncement from './components/PostAnouncement';
import Analytics from './components/Analytics';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout /> }>

          {/* Public Routes */}
          <Route index element={ <Homepage /> } />
          <Route path="clothes" element={ <Homepage /> } />
          <Route path="collectibles" element={ <Homepage /> } />
          <Route path="comics" element={ <Homepage /> } />
          <Route path="anouncements" element={ <Anouncements content="all" /> } />
          <Route path="anouncements:releases" element={ <Anouncements content="releases" /> } />
          <Route path="anouncements:discounts" element={ <Anouncements content="discounts" /> } />
          <Route path="anouncements:news" element={ <Anouncements content="news" /> } />
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
  );
};

export default App;