"use client"

const CartSummary = ({product}) => {
  console.log("product", product)
  return (
    <div>
    <h2 className="text-2xl font-medium text-gray-900 mt-3">
       Order summary
     </h2>
     <div className="mt-6 space-y-4">
       <div className="flex items-center justify-between">
         <p className="text-sm text-gray-600">Subtotal</p>
         <p className="text-sm font-medium text-gray-900">00</p>
       </div>

       <div className="flex items-center justify-between border-t border-gray-200 pt-4">
         <p className="text-base font-medium text-gray-900">
           Total Discount
         </p>
         <p className="text-sm font-medium text-gray-900">00</p>
       </div>
       <div className="flex items-center justify-between border-t border-gray-200 pt-4">
         <p className="text-base font-medium text-gray-900">
           Payable total
         </p>
         <p className="text-sm font-medium text-gray-900">00</p>
       </div>

       <div className="w-full h-24 ">
        <button
          className={
            "bg-transparent border  border-gray-500 text-black rounded-lg px-6 py-1.5 hover:bg-red-500 hover:text-black duration-300 my-2"
          }
        >
          Payment
        </button>
      </div>
      
     </div>
    </div>
  )
}

export default CartSummary