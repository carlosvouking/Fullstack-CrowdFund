import {useState } from 'react';
import {HiMenuAlt4, HiMenu} from "react-icons/hi";
import {AiOutlineClose, AiOutlineCloseSquare} from "react-icons/ai";

import logo from "../../images/logo_fryckio.png";   


// functional component for items in the navbar
const NavBarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}> 
      {title} 
    </li>
  )
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

    return (
       <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
            <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
            {["Dashboard", "Transfer","Crypto-Education", "CryptoWallet"].map((item, index) => (
               <NavBarItem key={item + index} title={item} />
            ))}
            <li className="text-white bg-[#d69e3e] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#b7791f] hover:text-yellow-200">
               Login
            </li>
        </ul>

        {/* responsiveness...mobile screens navigation */}
        <div className="flex relative">
           {/* if toggleMenu is turned on, show the AiOutlineClose icon, otherwise show the HiMenuAlt4 icon */}
           {toggleMenu 
           ? <AiOutlineClose fontSize={30} className="text-yellow-200 md:hidden cursor-pointer" onClick={()=> setToggleMenu(false)} /> 
           : <HiMenu fontSize={30} className="text-yellow-200 md:hidden cursor-pointer" onClick={()=> setToggleMenu(true)} />}
           
           {/* If toggleMenu set to true show nav items*/}
           {toggleMenu && (
              <ul className='z-10 fixed top-0 -right-1 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                             flex flex-col justify-start items-end rounded-md blue-glassmorphism text-yellow-500 animate-slide-in'>
                  <li className='text-xl w-full my-2'>
                       <AiOutlineClose onClick={() => setToggleMenu(false)} />
                  </li>
                   {["Dashboard", "Transfer","Crypto-Education", "CryptoWallet"].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                   ))}
              </ul>
           )}
        </div>
       </nav>
    ); 
}

export default Navbar;


