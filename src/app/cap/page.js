import { getManCap } from "../../helper";
import Container from "../../components/Container";
import ProductsCard from "../../components/ProductsCard";

const CapItem = async () => {
  const cap = await getManCap();
  return (
    <Container className={"py-10"}>
      <h1 className="text-2xl font-semibold text-black">
        All Trending Cap Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {cap.map((item) => (
          <ProductsCard key={item.id} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default CapItem;
