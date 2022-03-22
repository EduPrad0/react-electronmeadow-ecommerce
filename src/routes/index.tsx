import React from "react";
import { BrowserRouter, Routes as Config, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Checkout } from "../containers/Checkout";
import { ContentsProducts } from "../containers/ContentsProducts";
import { Home } from "../containers/Home";



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
          // recebe nesse formato `nomeloja=NOME?` 
          path="/checkout/:id"
          element={
            <Checkout />
          }
        />

      </Config>
    </BrowserRouter>
  );
}
