const Container = ({ children, className }) => {
  return (
    <div className={`${className} max-w-screen-xl mx-auto px-4 xl:px-0 py-4`}>
      {children}
    </div>
  );
};

export default Container;
// import { twMerge } from "tailwind-merge"

// const Container = ({children, className}) => {
//     const newClass = twMerge( "max-w-screen-xl lg:mx-16 px-4 lg:px-0",
//     className)

//   return (
//     <div className={newClass}>
//         {children}
//     </div>
//   )
// }

// export default Container
