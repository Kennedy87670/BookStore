import { useEffect, useState } from "react";

import { fetchProducts } from "../../product/productService";
import { ProductCard } from "../../../components";

export const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchAndSetProducts = () => {
    try {
      fetchProducts().then((res) => {
        console.log(res.docs);

        setProducts(res?.docs);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAndSetProducts();
  }, []);

  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">
        Featured eBooks
      </h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products
          .map((product) => <ProductCard key={product._id} product={product} />)
          .slice(0, 3)}
      </div>
    </section>
  );
};
