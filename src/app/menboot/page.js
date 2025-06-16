import Container from "../../components/Container";

import { getManBoot } from "../../helper";
import ProductsCard from "../../components/ProductsCard";

const ManBoot = async () => {
  const boot = await getManBoot();
  return (
    <Container className={"py-10"}>
      <h1 className="text-2xl font-semibold text-black">
        All Trending Boot Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {boot.map((item) => (
          <ProductsCard key={item.id} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default ManBoot;
