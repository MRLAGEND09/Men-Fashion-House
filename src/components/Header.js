"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import {
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaShopware,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { addUser, deleteUser } from "./redux/shoppingSlice";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbar = [
    { title: "Home", href: "/" },
    { title: "All Products", href: "/allProducts" },
    { title: "Mens Sneaker", href: "/mansneaker" },
    { title: "Mens Pants", href: "/pants" },
    { title: "Mens Boot", href: "/menboot" },
    { title: "Bag", href: "/bag" },
    { title: "Cap", href: "/cap" },
    { title: "Earphones", href: "/earphone" },
    { title: "Bottle", href: "/bottle" },
  ];

  const pathname = usePathname();
  const cartItems = useSelector((state) => state.name.cart);
  const disPatch = useDispatch();

  const { data: session } = useSession();
  // console.log("session", session);

  useEffect(() => {
    if (session) {
      disPatch(
        addUser({
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        })
      );
    } else {
      disPatch(deleteUser());
    }
  }, [session, disPatch]);

  return (
    <div className="">
      <Container className="flex justify-between items-center">
        <Link href={"/"}>
          <FaShopware className="text-3xl text-blue-600" />
        </Link>

        {/* Navbar links - Hidden on small screens */}
        <div className="hidden md:flex gap-7">
          {navbar.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              } hover:text-blue-500 transition-colors duration-300`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Favorite, Cart, User/Login Icons */}
        <div className="flex gap-8 items-center">
          <div className="relative">
            <FaHeart className="text-gray-700 hover:text-red-600 text-xl cursor-pointer transition-colors duration-300" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>

          <Link href={"/cart"} className="relative">
            <FaShoppingCart className="text-gray-700 hover:text-blue-600 text-xl cursor-pointer transition-colors duration-300" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {cartItems.length > 0 ? cartItems.length : "0"}
            </span>
          </Link>

          {/* Login/User section */}
          {session?.user ? (
            <div className="relative flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={session.user.image}
                  alt="User"
                  height={30}
                  width={30}
                  className="w-8 h-8 rounded-full"
                />
                {/* <p className="text-gray-700">{session.user.name}</p> */}
              </div>
              <button
                onClick={() => signOut()}
                className="text-sm text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <p
              onClick={() => signIn()}
              className="text-gray-700 hover:text-blue-600 text-xl cursor-pointer transition-colors duration-300"
            >
              <FaUserCircle />
            </p>
          )}

          {/* Hamburger Menu for mobile */}
          <div className="md:hidden">
            {isMobileMenuOpen ? (
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <FaBars
                className="text-2xl cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </Container>

      {/* Mobile menu - Toggle visibility */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {navbar.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`block p-2 ${
                pathname === item.href
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              } hover:text-blue-500 transition-colors duration-300`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
