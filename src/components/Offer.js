import { FaShippingFast, FaDollarSign, FaHeadset } from 'react-icons/fa';
import Container from './Container';

const Offer = () => {
    const offers = [
        {
          id: 1,
          title: 'Free Shipping',
          description: 'Enjoy free shipping on all orders above $50. Fast and reliable delivery.',
          icon: <FaShippingFast className="text-blue-500 text-4xl" />,
        },
        {
          id: 2,
          title: 'Money Back Guarantee',
          description: 'If you are not satisfied with your purchase, we offer a 30-day money-back guarantee.',
          icon: <FaDollarSign className="text-green-500 text-4xl" />,
        },
        {
          id: 3,
          title: '24/7 Customer Support',
          description: 'Our team is available 24/7 to assist you with any queries or issues.',
          icon: <FaHeadset className="text-red-500 text-4xl" />,
        },
      ];
  return (
  <Container>
      <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div key={offer.id} className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {offer.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700">{offer.title}</h3>
              <p className="text-gray-600 mt-2">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Container>
  )
}

export default Offer