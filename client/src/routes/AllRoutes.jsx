import { Route, Routes } from "react-router-dom";
import { HomePage, ProductList } from "../pages";
import { ProductDetail } from "../pages/product/components/ProductDetail";
export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
};
