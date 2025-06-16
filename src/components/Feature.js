import { FaRegLightbulb, FaLock, FaSyncAlt } from 'react-icons/fa';
import Container from './Container';

const Feature = () => {
    const features = [
        {
          id: 1,
          title: 'Innovative Products',
          description: 'We bring you the latest and most innovative products on the market.',
          icon: <FaRegLightbulb className="text-yellow-500 text-4xl" />,
        },
        {
          id: 2,
          title: 'Secure Payment',
          description: 'Your payment information is processed securely and encrypted for safety.',
          icon: <FaLock className="text-blue-500 text-4xl" />,
        },
        {
          id: 3,
          title: 'Easy Returns',
          description: 'Not satisfied? Return the product within 30 days for an easy refund.',
          icon: <FaSyncAlt className="text-green-500 text-4xl" />,
        },
      ];
  return (
   <Container>
     <section className=" py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-700">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
   </Container>
  )
}

export default Feature