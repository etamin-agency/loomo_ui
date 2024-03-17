import { FaHome,FaGift, FaShoppingCart, FaShuttleVan } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from "react";

const sidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <FaHome />,
  },
  {
    title: "Delivery",
    path: "/delivery",
    icon: <FaShuttleVan />,
  },
  {
    title: "Pickup",
    path: "/pickup",
    icon: <FaGift />,
  },
  {
    title: "Catalog",
    path: "/catalog",
    icon: <FaHome />,
  },
  {
    title: "Cart",
    path: "/cart",
    icon: <FaShoppingCart />,
  },
]

const App: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-[100vh] bg-[#285A43]">
      <div
        className={`${open ?  "w-[330px]" : "w-[100px] "} relative bg-[#285A43] h-[400px] flex-row gap-x-4 items-center ps-6 pt-8  duration-300 `}
      >
      
        <img
        alt="img"
          src="arraw.png"
          className={`absolute  top-16 -right-3 cursor-pointer  w-7 border-dark-purple
           border-2 rounded-full   ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      
       
        <div className="flex gap-x-4 items-center h-[auto] mt-3 mb-7 ms-2">
        <div className={`w-[45px] h-[45px] bg-[#B4E0A0]  flex justify-center rounded-[5px] ${
                open && "scale-0"
              }`}>

          <img
             alt="img"
              src="e.png"
              className={`cursor-pointer duration-500 ${
                open && "scale-0"
              }`}
            />
        </div>
          
          <h1
            className={`text-white origin-left font-medium text-[35px] duration-200 ${
              !open && "hidden"
            }`}
          >
            EUFLORIA
          </h1>
        </div>
      <div className="flex justify-end">
      <div
        className={` ${
          open ? "w-[330px]" : "w-[100px] "
        } ps-6 h-auto `}
      >
      
        
        <ul className="nav-list flex flex-col justify-end w-[250px]">
          {sidebarData.map((item, index) => {
            return (
              <li className="nav-item w-[200px] h-[auto] flex flex-col gap-2" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => [
                    "nav-link",
                    isActive ? "active" : null,
                    "text-white hover:text-white", // Tailwind CSS classes for text color
                    "flex items-center", // Flex layout
                    "py-2 px-4", // Padding
                    "text-end",
                    "transition-colors duration-300", // Transition effect
                    "border-l-4 border-transparent", // Border left
                    isActive ? "border-indigo-500" : null, // Border color for active link
                  ].join(" ")}
                  
                >
                  <div className="nav-link-icon mr-5 text-[#68da68] text-[20px]">
                    {item.icon}
                  </div>
                  <span className={`${!open && "hidden"} text-[20px]`}>{item.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
     
    </div>
      </div>
      
    </div>

      
    
    
  )
};

export default App;
