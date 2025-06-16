import Image from 'next/image'
import img1 from '../assets/banner/b17.jpg'
import img2 from '../assets/banner/b16.jpg'
import img3 from '../assets/banner/b17.jpg'
import img4 from '../assets/banner/b18.jpg'
import img5 from '../assets/banner/watch2 - Copy (2).jpg'
import img6 from '../assets/banner/watch1 - Copy.jpg'
import Container from './Container'

const Upcamming = () => {
  return (
    <Container>
      {/* Two Card Section */}
      <section className="mt-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">Upcoming Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full h-80">
            <Image src={img1} alt="Banner 1" className="bg-contain" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>
            <div className="absolute inset-0 flex items-center justify-end p-6 md:p-10 text-white">
              <div className="max-w-md mr-0 md:mr-24">
                <h1 className="mb-5 text-2xl md:text-3xl font-bold">Crazy Deals</h1>
                <h1 className="text-3xl md:text-4xl">Buy 1 Get 1 Free</h1>
                <p className="mb-5">The best classic dress is on sale at Coro.</p>
                <button className="bg-white text-black py-2 px-4 inline-block mt-4">Explore More</button>
              </div>
            </div>
          </div>

          <div className="relative w-full h-80">
            <Image src={img2} alt="Banner 2" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>
            <div className="absolute inset-0 flex items-center justify-end p-6 md:p-10 text-white">
              <div className="max-w-md mr-0 md:mr-24">
                <h1 className="mb-5 text-2xl md:text-3xl font-bold">Crazy Deals</h1>
                <h1 className="text-3xl md:text-4xl">Buy 1 Get 1 Free</h1>
                <p className="mb-5">The best classic dress is on sale at Coro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Card Section */}
      <section className="mt-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">Latest Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative w-full h-64">
            <Image src={img3} alt="Banner 3" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>
            <div className="absolute inset-0 flex items-center justify-end p-6 md:p-10 text-white">
              <div className="max-w-md mr-0 md:mr-24">
                <h1 className="mb-5 text-2xl md:text-3xl font-bold">Crazy Deals</h1>
                <h1 className="text-3xl md:text-4xl">Buy 1 Get 1 Free</h1>
                <p className="mb-5">The best classic dress is on sale at Coro.</p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-64">
            <Image src={img4} alt="Banner 4" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>
            <div className="absolute inset-0 flex items-center justify-end p-6 md:p-10 text-white">
              <div className="max-w-md mr-0 md:mr-24">
                <h1 className="mb-5 text-2xl md:text-3xl font-bold">Crazy Deals</h1>
                <h1 className="text-3xl md:text-4xl">Buy 1 Get 1 Free</h1>
                {/* <p className="mb-5">The best classic dress is on sale at Coro.</p> */}
              </div>
            </div>
          </div>

          <div className="relative w-full h-64">
            <Image src={img6} alt="Banner 5" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>
           
          </div>
        </div>
      </section>
    </Container>
  )
}

export default Upcamming
