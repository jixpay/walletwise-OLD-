import { configureStore } from "@reduxjs/toolkit";
import auth_slice from "./reducers/auth_slice";
import notification_slice from "./reducers/notification_slice";
import store_slice from "./reducers/store_slice";
import products_slice from "./reducers/products_slice";
import cart_slice from "./reducers/cart_slice";
import cartproduct_slice from "./reducers/cartproduct_slice";
import order_slice from "./reducers/order_slice";
import orderproduct_slice from "./reducers/orderproduct_slice";

export const store = configureStore({
  reducer: {
    auth: auth_slice,
    notif: notification_slice,
    store: store_slice,
    product: products_slice,
    cart: cart_slice,
    cartproduct: cartproduct_slice,
    order: order_slice,
    orderproduct: orderproduct_slice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
