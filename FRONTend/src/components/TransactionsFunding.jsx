import React, { useContext } from "react";

import { FundMeContext } from "../context/FundMeContext";
import { shortenAddress } from "../utils/shortenAddress";
import useFetchFund from "../hooks/useFetchFund";
import { RiSoundModuleFill } from "react-icons/ri";
import { contractAddress } from "../utils/constants";



// Crowdfunding Txns
   const CrowFundTransactionsCard = ({ addressToFund , addressFrom, timestamp, messageFund, keywordFund, ethAmount, url })  => {
   const gifUrl = useFetchFund({ keywordFund})   
   
   return (   
      <div className="bg-[#181919] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
             <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                   <a href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                       <p className="text-white text-base"> From: {shortenAddress(addressFrom)}</p>              
                   </a>
                   <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`} target="_blank" rel="noopener noreferrer">
                       <p className="text-white text-base"> To: {shortenAddress(contractAddress)}</p>              
                   </a>
                   <p className="text-yellow-100 text-base">Amount: {ethAmount} ETH</p>
                   { messageFund && (    // if there is a message included with the funding transaction,
                     <>
                        <br />
                        <p className="text-white text-base">Message: {messageFund}</p>
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


const TransactionsFunding = () => {
   const { currentAccount, crowdfundTransactions } = useContext(FundMeContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 bg-black">
           <div className='flex flex-col md:p-12 px-4'>
              {currentAccount ? (
                <h2 className="text-white text-3xl text-center my-2">Funding transactions</h2>
              ) : (
                <h2 className='text-white text-3xl text-center my-2'>
                    Connect an account to view Crowfunding transactions
                </h2>
              )}

              <div className="flex flex-wrap justify-center items-center mt-10">                 
                {crowdfundTransactions.reverse().map((crowFundtransaction, i) => (
                   <CrowFundTransactionsCard key={i} {...crowFundtransaction} />
                ))}
              </div>
           </div>
        </div>
    );
}


export default TransactionsFunding;



