export const getData = async (endpoint) => {
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};

export const getManSneaker = async () => {
  const endPoint = "https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;
  const filterData = product.filter(
    (item) => item.category === "Men's Sneaker"
  );

  return filterData;
};
export const getMenPant = async () => {
  const endPoint = " https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;
  const filterData = product.filter((item) => item.category === "Men's Pants");

  return filterData;
};
export const getManBoot = async () => {
  const endPoint = "https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;
  const filterData = product.filter((item) => item.category === "Men's Boot");

  return filterData;
};
export const getManBag = async () => {
  const endPoint = "https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;
  const filterData = product.filter((item) => item.category === "Bag");

  return filterData;
};
export const getManCap = async () => {
  const endPoint = "https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;
  const filterData = product.filter((item) => item.category === "Cap");

  return filterData;
};
export const getManEarPhone = async () => {
  const endPoint = "https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;
  const filterData = product.filter((item) => item.category === "Earphones");

  return filterData;
};
export const getBottle = async () => {
  const endPoint = "https://shoppingapi.vercel.app/products";
  const products = await getData(endPoint);
  const product = products;
  const filterData = product.filter((item) => item.category === "Bottle");

  return filterData;
};
