import { getData } from "../helper";
import Container from "./Container";

import ProductsCard from "./ProductsCard";

const ProductItem = async () => {
  const endPoint = "https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;

  return (
    <Container className={""}>
      <h1 className="text-xl font-semibold text-black">
        All Tranding Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
        {product.slice(0, 20).map((item, index) => (
          <ProductsCard key={index} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default ProductItem;
