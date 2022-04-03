import React from "react";
import { BrowserRouter, Routes as Config, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ContentsProducts } from "../containers/ContentsProducts";
import { Home } from "../containers/Home";
import { Product } from "../containers/Product";
import { Orders } from '../containers/Orders'
import { Register } from "../containers/Register";


interface IProutes {
  children: React.ReactNode;
}

export function Routes() {

  // rotas padrões
  const Proutes = ({ children }: IProutes) => (
    <Layout>
      {children}
    </Layout>
  )

  return (
    <BrowserRouter>
      <Config>
        <Route
          path="/"
          element={
            <Proutes children={<Home />} />
          }
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />
        <Route
          path="/shop"
          element={
            <ContentsProducts />
          }
        />

        <Route
          path="/sneakers"
          element={
            <ContentsProducts />
          }
        />

        <Route
          path="/clothes"
          element={
            <ContentsProducts />
          }
        />

        <Route
          path="/smartwatches"
          element={
            <ContentsProducts />
          }
        />

        <Route
          path="/product/:category/:id"
          element={
            <Product />
          }
        />

        <Route
          path="/orders"
          element={
            <Orders />
          }
        />

      </Config>
    </BrowserRouter>
  );
}
