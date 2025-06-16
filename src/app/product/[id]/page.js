// "use client"

import { getData } from "../../../helper";
import SingleProduct from "../../../components/SingleProduct"

const SingleProductPage = async({params}) => {

  const {id} = params;
  const endPoint = `https://shoppingapi.vercel.app/shopping`;

  const product =await getData(endPoint)
  const findData = product.find((item) => item.id == id)

 


  return (
    <div className="py-10">
      <SingleProduct findData={findData}/>
    </div>
  )
}

export default SingleProductPage