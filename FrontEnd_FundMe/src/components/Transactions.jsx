import React, { useContext } from "react";

import { FundMeContext } from "../context/FundMeContext";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";
import { RiSoundModuleFill } from "react-icons/ri";


// peer-2-peer Txns 
const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url })  => {
   const gifUrl = useFetch({ keyword})   
   return (   
      <div className="bg-[#181919] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
             <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                   <a href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                       <p className="text-white text-base"> From: {shortenAddress(addressFrom)}</p>              
                   </a>
                   <a href={`https://rinkeby.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                       <p className="text-white text-base"> To: {shortenAddress(addressTo)}</p>              
                   </a>
                   <p className="text-yellow-100 text-base">Amount: {amount} ETH</p>
                   { message && (    // if there is a message with the transaction,
                     <>
                        <br />
                        <p className="text-white text-base">Message: {message}</p>
                     </>   
                   )}
                </div>
                {/* rendering the image here... */}
                <img src={gifUrl || url} alt="gif" className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover" />

               {/*  timestamp */}
               <div className="bg-black p-3 px-5 w-max rounded-2xl shadow-2xl">
                  <p className="text-yellow-200 font-bold">{timestamp}</p>
               </div>
             </div>         
      </div>
   )
}


const Transactions = () => {
    const { currentAccount, transactions } = useContext(FundMeContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 bg-black">
           <div className='flex flex-col md:p-12 px-4'>
              {currentAccount ? (
                <h2 className="text-white text-3xl text-center my-2">Peer-2-Peer transactions</h2>
              ) : (
                <h2 className='text-white text-3xl text-center my-2'>
                     Connect an account to view Peer-2-Peer transactions
                </h2>
              )}

              <div className="flex flex-wrap justify-center items-center mt-10">                 
                {transactions.reverse().map((transaction, i) => (
                   <TransactionsCard key={i} {...transaction} />
                ))}
              </div>
           </div>
        </div>
    );
};


export default Transactions;



