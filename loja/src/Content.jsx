import React from "react";
import { Route, Routes } from "react-router-dom";
import Store from "./pages/Store";
import Cart from "./pages/Cart"

export const Content = () => {
    return (
        <Routes>
            <Route exact path="/cart" element={<Cart/>} />
            <Route exact path="/" element={<Store />} />
        </Routes>
    );
}
