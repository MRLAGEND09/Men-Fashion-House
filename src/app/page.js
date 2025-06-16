import CarouselBanner from "../components/CarouselBanner";
import ProductItem from "../components/ProductItem";
import Upcamming from "../components/Upcamming";
import Offer from "../components/Offer";
import Feature from "../components/Feature";
import PromotionSection from "../components/PromotionSection";
import CategoriesSection from "../components/CategoriesSection";
import Faquestion from "../components/Faquestion";

const HomePage = () => {
  return (
    <div>
      <CarouselBanner />
      <CategoriesSection />
      <ProductItem />
      <Upcamming />
      <Offer />
      <Feature />
      <PromotionSection />
      <Faquestion />
    </div>
  );
};

export default HomePage;
