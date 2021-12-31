import "./App.css";

import { Routes, Route } from "react-router-dom";
import SigninScreen from "./pages/SigninScreen";
import ProductScreen from "./pages/ProductScreen";
import HomeScreen from "./pages/HomeScreen";
import CartScreen from "./pages/CartScreen";
import SignupScreen from "./pages/RegisterScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import { Header } from "./component/HomePageComponent/Header";
import { Footer } from "./component/HomePageComponent/Footer";
import ManageProductScreen from "./pages/ManageProductScreen";
import CategoryScreen from "./pages/CategoryScreen";
import EditSingleProductScreen from "./pages/EditSingleProductScreen";
import EditWebsiteInfo from "./pages/EditWebsiteInfo";
import AddProductScreen from "./pages/AddProductScreen";
import ProtectedRoute from "./component/ProtectedRoute";
import NavBar from "./component/HomePageComponent/NavBar";
//import image from "./picture/shop.jpeg";
function App() {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#272b34" }}>
        <NavBar />
      </div>

      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/register" element={<SignupScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:productId/:qty" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/category" element={<CategoryScreen />}></Route>
        <Route
          path="/signin/shipping"
          element={
            <ProtectedRoute>
              <ShippingAddressScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentMethodScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/placeorder"
          element={
            <ProtectedRoute>
              <PlaceOrderScreen />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/order/:orderId"
          element={
            <ProtectedRoute>
              <OrderScreen />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/orderhistory"
          element={
            <ProtectedRoute>
              <OrderHistoryScreen />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/manageproduct"
          element={
            <ProtectedRoute>
              <ManageProductScreen />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/editproduct/:id"
          element={
            <ProtectedRoute>
              <EditSingleProductScreen />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/editwebsiteinfo"
          element={
            <ProtectedRoute>
              <EditWebsiteInfo />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProductScreen />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
