

"use client";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { addShpping } from "./redux/shoppingSlice"; // Verify spelling here
import toast from "react-hot-toast";


const AddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();
  

  const handleAddToCart = () => {
    if(product){
      dispatch(addShpping(product));
      toast.success(`product added successfully`);
    
    }
  };


  return (
    <div className="mt-5 px-2">
  
       
     
        <button
          onClick={handleAddToCart}
          className={twMerge(
            "bg-transparent w-full border border-gray-500 text-black rounded-full px-6 py-1.5 hover:bg-white hover:text-black duration-300 my-2"
          )}
        >
          Add To Cart
        </button>
 
    </div>
  );
};

export default AddToCartBtn;


















// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import { twMerge } from "tailwind-merge";
// import { addShpping } from "./redux/shoppingSlice"; // Verify spelling here
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { FaMinus, FaPlus } from "react-icons/fa";

// const AddToCartBtn = ({ className, product }) => {
//   const dispatch = useDispatch();
  
//   // Add product to cart
//   const handleAddToCart = () => {
//     dispatch(addShpping(product));
//     toast.success(`${product.name} added successfully`);
//   };

//   const selector = useSelector((state) => state.name.cart);
//   const [existing, setExisting] = useState(null);

//   // Check if the product is already in the cart
//   useEffect(() => {
//     const availableProduct = selector.find((item) => item.id === product.id);
//     setExisting(availableProduct);
//   }, [selector, product]); // Add dependencies

//   return (
//     <div className="mt-5 px-2">
//       {existing ? (
//         <div className="flex justify-between items-center">
//           <span className="text-red-400 text-xl bg-[#ECEEF0] border border-gray-300 rounded-full p-2 hover:bg-white duration-300">
//             <FaMinus />
//           </span>
//           <span>{existing.quantity}</span>
//           <span className="text-red-400 text-xl bg-[#ECEEF0] border border-gray-300 rounded-full p-2 hover:bg-white duration-300">
//             <FaPlus />
//           </span>
//         </div>
//       ) : (
//         <button
//           onClick={handleAddToCart}
//           className={twMerge(
//             "bg-transparent w-full border border-gray-500 text-black rounded-full px-6 py-1.5 hover:bg-white hover:text-black duration-300 my-2",
//             className
//           )}
//         >
//           Add To Cart
//         </button>
//       )}
//     </div>
//   );
// };

// export default AddToCartBtn;
