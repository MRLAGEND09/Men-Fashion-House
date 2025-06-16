import Container from "../../components/Container";

import { getManSneaker } from "../../helper";

import ProductsCard from "../../components/ProductsCard";

const ManSneaker = async () => {
  const sneaker = await getManSneaker();
  return (
    <Container className={"py-10"}>
      <h1 className="text-2xl font-semibold text-black">
        All Trending Sneakers Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {sneaker.map((item) => (
          <ProductsCard key={item.id} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default ManSneaker;
