import Container from "../../components/Container";
import { getMenPant } from "../../helper";
import ProductsCard from "../../components/ProductsCard";

const PantItem = async () => {
  const pant = await getMenPant();
  return (
    <Container className={"py-10"}>
      <h1 className="text-2xl font-semibold text-black">
        All Trending jens Pant Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {pant.map((item) => (
          <ProductsCard key={item.id} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default PantItem;
