import React from 'react'
import Container from './Container'

const Faquestion = () => {
    const faqs = [
        {
          id: 1,
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy. Items must be unused and in the original packaging.',
        },
        {
          id: 2,
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days. Express shipping options are available.',
        },
        {
          id: 3,
          question: 'Can I track my order?',
          answer: 'Yes, once your order is shipped, you will receive a tracking number via email.',
        },
      ];
  return (
    <Container>
        <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Container>
  )
}

export default Faquestion