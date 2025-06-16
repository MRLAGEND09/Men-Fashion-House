import Container from "./Container";

const PromotionSection = () => {
  const promotions = [
    {
      id: 1,
      title: "Summer Sale - Up to 50% Off",
      description: "Don’t miss our limited-time summer sale on selected items.",
      bgColor: "bg-yellow-400",
    },
    {
      id: 2,
      title: "Buy One, Get One Free!",
      description:
        "Exclusive offer! Buy one and get another free on selected products.",
      bgColor: "bg-red-400",
    },
    {
      id: 3,
      title: "Free Shipping on Orders Over $100",
      description: "Get free shipping when your order exceeds $100. Hurry up!",
      bgColor: "bg-green-400",
    },
  ];
  return (
    <Container>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Exclusive Promotions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`${promo.bgColor} p-8 rounded-lg shadow-lg text-white`}
              >
                <h3 className="text-xl font-semibold mb-4">{promo.title}</h3>
                <p>{promo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default PromotionSection;
