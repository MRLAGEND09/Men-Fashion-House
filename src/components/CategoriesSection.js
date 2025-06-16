import Link from 'next/link';
import Container from './Container';
import { FaTshirt, FaLaptop, FaMobileAlt } from 'react-icons/fa';

const CategoriesSection = () => {
    const categories = [
        {
            id: 1,
            name: 'Clothing',
            icon: <FaTshirt className="text-purple-500 text-4xl" />,
            href: "/pants"
        },
        {
            id: 2,
            name: 'Electronics',
            icon: <FaLaptop className="text-blue-500 text-4xl" />,
            href: "/earphone"
        },
        {
            id: 3,
            name: 'Mobile Phones',
            icon: <FaMobileAlt className="text-green-500 text-4xl" />,
            href: "/earphone"  // Updated href for consistency
        },
    ];

    return (
        <Container>
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link 
                                href={category.href} 
                                key={category.id} 
                                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 block" // Added block class
                            >
                                <div className="flex justify-center mb-4">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default CategoriesSection;
