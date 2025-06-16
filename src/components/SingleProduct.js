"use client"
import Image from "next/image";
import Container from "./Container";
import { IoIosStar } from 'react-icons/io';
import { AiOutlineStock } from "react-icons/ai";
import AddToCartBtn from "./AddToCartBtn";
import Link from "next/link";

const SingleProduct = ({ findData }) => {
  return (
    <Container className="">
      <div className="flex flex-col md:flex-row justify-center items-center bg-[#ECEEF0] rounded-md p-6 md:p-8 space-y-6 md:space-y-0 md:space-x-8">
        {/* Left - Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={findData.img}
            alt="product image"
            height={300}
            width={300}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Right - Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-xl md:text-2xl font-bold">{findData.name}</h1>
          <h1 className="text-xl md:text-2xl font-bold text-gray-700">$ {findData.price}</h1>
          <h1 className="text-lg md:text-xl text-black">Seller: {findData.seller}</h1>
          <h1 className="text-sm md:text-base text-gray-500">Category: {findData.category}</h1>

          {/* Stock Status */}
          <div className="flex items-center mt-2">
            <AiOutlineStock className={`mr-2 ${findData.stock ? "text-green-500" : "text-red-500"}`} />
            <p className={`text-sm md:text-base ${findData.stock ? "text-green-500" : "text-red-500"}`}>
              {findData.stock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center mt-2 text-yellow-500">
            {Array.from({ length: findData.ratings }, (_, index) => (
              <IoIosStar key={index} className="text-yellow-400" />
            ))}
            <span className="ml-2 text-sm md:text-base text-gray-600">({findData.ratings})</span>
          </div>

          {/* Add to Cart Button */}
          <Link href={"/cart"} className="mt-4">
            <AddToCartBtn />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SingleProduct;
