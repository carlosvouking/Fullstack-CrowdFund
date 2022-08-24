import React from 'react';
import { BsShieldFillCheck } from "react-icons/bs";
import {BiFontSize, BiSearchAlt, BiTransferAlt} from "react-icons/bi";
import {Ri24HoursFill, Ri24HoursLine, RiExchangeDollarFill, RiHeart2Fill} from "react-icons/ri";

/* 
Reusable component for our services badge information
instantly returning the color, title, the titles and subtitles of each service badge 
*/
const ServiceBadge = ({color, title, icon, subtitle}) => (
   // each servicebadge
   <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
     <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
     </div>
     <div className="ml-5 flex flex-col flex-1">
        <h3 className="mt-2 text-amber-300 text-lg">{title}</h3>
        <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
     </div>
   </div>
);

const Services = () => {
  return (    
        <div className="flex w-full justify-center items-center bg-black">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">

                {/* Division left */}
                <div className="flex-1 flex flex-col justify-start items-start">
                   <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
                        Services endpoint
                         <br />
                        still in improvement.
                    </h1>
                    <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
                    The best tool till date for money transfer in cryptocurrency. Transfer in stablecoin and receive in local currency.
                    </p>
                </div>
           
                {/* Division right - Badge */}
                <div className="flex-1 flex-row justify-start items-center">
                    <ServiceBadge 
                                color="bg-amber-100" 
                                title="Among the fastest transfers" 
                                icon={<Ri24HoursFill fontSize={21} className="text-yellow-00" />}
                                // subtitle="Tout est mis en place pour des transactions effectuées en un clic, 
                                //           tracking assuré et vérification en tout temps." 
                                subtitle="Everything is set up for one-click transactions, guaranteed tracking and verification at all times."          
                                />
                    <ServiceBadge 
                                color="bg-yellow-100" 
                                title="Security garanteed" 
                                icon={<BsShieldFillCheck fontSize={21} className="text-green-00" />}
                                // subtitle="la sécurité des transactions et la fluidité de nos services est 
                                //          garantie d'un point à l'autre de la chaîne" 
                                subtitle="the security of transactions and the fluidity of our services is guaranteed from one point to another in the chain." 
                                />
                    <ServiceBadge 
                                color="bg-yellow-100" 
                                title="Unbeatable transfer rates" 
                                icon={<BiTransferAlt fontSize={21} className="text-yellow-00" />}
                                subtitle="Transaction fees are almost insignificant compared to traditional transactions" /> 

                </div>                

            </div>  
        </div>   
    );
}

export default Services;