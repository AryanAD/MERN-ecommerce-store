import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Private Routes
import PrivateRoutes from "./components/PrivateRoutes.jsx";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Profile from "./pages/User/Profile.jsx";

// Admin
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import CreateAndListCategories from "./pages/Admin/Categories/CreateAndListCategories.jsx";
import ListUsers from "./pages/Admin/Users/ListUsers.jsx";
import CreateProduct from "./pages/Admin/Products/CreateProduct.jsx";
import ListProducts from "./pages/Admin/Products/ListProducts.jsx";
import UpdateProduct from "./pages/Admin/Products/UpdateProduct.jsx";
import SingleFavorite from "./pages/Admin/Products/favorites/SingleFavorite.jsx";
import SingleProduct from "./pages/Admin/Products/SingleProduct.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import UserOrder from "./pages/User/UserOrder.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite-product" element={<SingleFavorite />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/user-orders" element={<UserOrder />} />

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="users-list" element={<ListUsers />} />
        <Route path="categories-list" element={<CreateAndListCategories />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="product-update/:_id" element={<UpdateProduct />} />
        <Route path="products-list" element={<ListProducts />} />
        <Route path="orders-list" element={<OrderList />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
