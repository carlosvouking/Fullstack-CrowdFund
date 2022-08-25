import logo from "../../images/logo_fryckio.png";


const Footer = () => {
    return (
       <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 bg-black">
         <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
           {/* <div className="flex flex-[0.5] justify-center items-center">
                <img src={logo} alt="logo" className="w-32" />
           </div> */}
           <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
              {/* <p className="text-white text-base text-center mx-2 cursor-pointer"> Dashboard </p> */}
              {/* <p className="text-white text-base text-center mx-2 cursor-pointer"> Transfer </p>
              <p className="text-white text-base text-center mx-2 cursor-pointer"> Crypto-Education </p>
              <p className="text-white text-base text-center mx-2 cursor-pointer"> CryptoWallet </p> */}
           </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-4">
            {/* <p className="text-yellow-200 text-sm text-center">Tell us how you would like to join !</p> */}
            {/* <p className="text-yellow-200 text-sm text-center">contactus@fryck.io</p> */}
        </div>
        <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
        <div className="sm:w-[90%] w-full flex justify-between items-center mt-5">            
            <p className="flex-1 text-yellow-100 text-sm text-center">All rights reserved</p>
            {/* <p className="text-yellow-100 text-sm justify-between items-center mt-2">contact@fryck.io</p>
            <p className="text-yellow-100 text-sm text-center">@fryck.io - 2022</p> */}
        </div>
       </div>
    );
}


export default Footer;