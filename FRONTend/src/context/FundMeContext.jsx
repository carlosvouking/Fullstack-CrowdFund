/* 
This is a react context API which has the purpose to connect our React FE to the BE Smart contract
This to prevent writing the same logic accross all our components...
The logic comes here and will be called in all the components where needed.
 */

import React, { useEffect, useState } from "react";
import render from "react";
import  ReactDOM from "react-dom/client";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import App  from "../App";
import { RiContactsBookLine } from "react-icons/ri";
import  Modal_fund from "../components/Modals/Modal_fund";
import  Modal_balance from "../components/Modals/Modal_balance";


export const FundMeContext = React.createContext();
const { ethereum } = window;   // acces to ethereum window object through Metamask.


/*
For accessing the blockchain....first create a function to fetch our FundMe contract
These ingredients 'provider', 'signer', 'fundMeContract' are necesary to interact with the contract
and will then be put in a specific location to serve its purpose.
*/
const getEthereumFundMeContract = () => {
    /*
    provider or a node to send the transaction to...THE principe of a wallet is to give us a url(provider), and expose some node under the wood to interact with.
    For metamask the url is under 'window.ethereum'. So, the browser wallet creates a connection to the blockchain
    */
    const provider = new ethers.providers.Web3Provider(ethereum);   
    const signer = provider.getSigner();
    const fundMeContract = new ethers.Contract(contractAddress, contractABI, signer);

    // console.log({provider,signer,fundMeContract});   // just to check in the inspect..
    return fundMeContract;
}

// this is the context where to dump our ingredients required to fetch our contract.
// this context provider needs to get one thing from the props: 'the children'
export const FundMeProvider = ({children}) => {  
   const [currentAccount, setCurrentAccount] = useState("");
   // create the states of the data in the form in peer2peer
   const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: ""});
   // states of data in the crowdfunding
   const [formDataFund, setFormDataFund] = useState({addressToFund: "", ethAmount: "", keywordFund: "", messageFund: ""})
   // Loading state
   const [isLoading, setIsLoading] = useState(false);
   // store transactionCount to the state
   const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
   const [crowfundTransactionCount, setCrowFundTransactionCount] = useState(localStorage.getItem("crowfundTransactionCount"));

   const [transactions, setTransactions] = useState([]);   
   const [crowdfundTransactions, setCrowdFundTransactions] = useState([]);

   const [showModal, setShowModal] = useState(false);
   const [showModal_balance, setShowModal_balance] = useState(false);

   

   // and also a 'handleChange' to interact with the input and accept keyboard press as events(e)
   //...to dynamically update the form data.
   const handleChange = (e, name) => {
      setFormData((prevState) => ({...prevState, [name]: e.target.value })) // from previous form state to updating to the new state values ...
      setFormDataFund((prevState) => ({...prevState, [name]: e.target.value })) // from previous form state to updating to the new state values ...
   }
    

   //peer-2-peer
   const getAllTransactions = async () => {
       try {
           if(ethereum) {
                const fundMeContract =  getEthereumFundMeContract();

                const availableTransactions = await fundMeContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction) => ({
                        addressTo: transaction.receiver,
                        addressFrom: transaction.sender,
                        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                        message: transaction.message,
                        keyword: transaction.keyword,
                        amount: parseInt(transaction.amount._hex) / (10 ** 18)    
                }));  

           console.log("******Peer2Peer txns*********");
           console.log(structuredTransactions);

           setTransactions(structuredTransactions);
            } else {
                console.log("Pas d'Ethereum !");
            }
         } catch (error) {
            console.log(error);       
         }
    };    

    // crowfund txns
    const getAllCrowFundTransactions = async () => {
        try {
            if(ethereum) {
                 const fundMeContract =  getEthereumFundMeContract();         
 
                 const availableCrowFundTransactions = await fundMeContract.getAllCrowFundTransactions();
 
                 const structuredCrowFundTransactions = availableCrowFundTransactions.map((crowfundTransaction) => ({
                         addressToFund: crowfundTransaction.reciever,
                         addressFrom: crowfundTransaction.sender,
                         timestamp: new Date(crowfundTransaction.timestamp.toNumber() * 1000).toLocaleString(),
                         messageFund: crowfundTransaction.message,
                         keywordFund: crowfundTransaction.keyword,
                         ethAmount: parseInt(crowfundTransaction.amount._hex) / (10 ** 18)    
                 }));        
            
            console.log("******Crowdfunding txns******");
            console.log(structuredCrowFundTransactions);
 
            setCrowdFundTransactions(structuredCrowFundTransactions);
             } else {
                 console.log("Pas d'Ethereum !");
             }
          } catch (error) {
             console.log(error);       
          }
     };     



    const checkWalletConnection = async () => {
        try {
            //If there is no ethereum obj, prompt the user do to so before going on
            if(!ethereum) return alert("Il faudrait installer Metamask !");

            //Otherwise get all the metamask connected accounts
            const accounts = await ethereum.request({method: "eth_accounts"});

            // check if there is at least one account in metamask
            if(accounts.length) {
                setCurrentAccount(accounts[0]);  // the current account in use is the first account in metamask

                // get all the transactions here...to implement.       
                getAllTransactions();  
                getAllCrowFundTransactions(); 
            } else {
                console.log("Aucun compte trouvé !")
            }
        } catch (error) {
            // no ethereurm obj
            console.log(error);           
        }
    }
    
    // Check the existance of transaction?
    const checkTransactionExistance = async () => {
        try {
            const fundMeContract =  getEthereumFundMeContract();
            const transactionCount = await fundMeContract.getTransactionCount();
            const crowfundtransactionCount = await fundMeContract.getCrowFundTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount);
            window.localStorage.setItem("crowFundTransactionCount", crowfundtransactionCount);
        } catch (error) {
            console.log(error);

            //throw new Error("Aucun d'object ethereum détecté !");
        }
    };

    // connecting to the metamask wallet
    const connectWallet = async () => {        
        try {             
            // openModal_fund();                    
            if(!ethereum) return alert("Vous devriez installer Metamask !");
            // requesting all the accounts in Metamask to allow the user to choose which account to connect.
            const accounts = await ethereum.request({method: "eth_requestAccounts"});              
            // connect to the 1rst account
            setCurrentAccount(accounts[0]);  
            // openModal_fund();                       
            window.location.reload();                                                 
        } catch (error) {
            console.log(error);           
            throw new Error("Aucun objet ethereum détecté !");
        }         
    };

    const openModal_fund = () => {
         setShowModal(prev => !prev);
    };

    const openModal_balance = () => {
        setShowModal_balance(prev => !prev);
   };
    

    const sendTransaction = async () => {
        try {
            if(ethereum) {
             // get the data from the form in welcome.jsx all the way in the FundMeContext...EASY ?? Let's see        
            const { addressTo, amount, keyword, message } = formData;   // Here we have access to the form data variables
            const fundMeContract =  getEthereumFundMeContract();   // the variable 'fundMeContract' can then be used to pull all the functions in our FundMe contract.
            const parseAmountIntoGwei = ethers.utils.parseEther(amount);            

            // let's send some ethereum now...
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",  //21000 gwei
                    value: parseAmountIntoGwei._hex,  // 0.001
                }],
            });

            // save the transaction to the Blockchain
            const transactionHash = await fundMeContract.addToBlockchain(addressTo, parseAmountIntoGwei, message, keyword);   // this asynchronous action requires a Loading state to hide the time it takes...

            setIsLoading(true);
            console.log(`Loading ... ${transactionHash.hash}`);
            await transactionHash.wait();  //for the transaction to be finished            
            console.log(`Success ---> ${transactionHash.hash}`);
            setIsLoading(false);

            const transactionsCount = await fundMeContract.getTransactionCount();
            setTransactionCount(transactionsCount.toNumber());
            window.location.reload();
            } else {
                console.log("Aucun objet ethereum détecté !");
            }
        } catch (error) {
            console.log(error);
            
            throw new Error("Aucun objet ethereum détecté !");
        }
    };



    const sendCrowFundTransactionToBlockchain = async () => {
         try{
            if(ethereum) {
             // get the data from the form in welcome.jsx all the way in the FundMeContext...EASY ?? Let's see        
            let { addressToFund , ethAmount, keywordFund, messageFund } = formDataFund;   // Here we have access to the form data variables
            const fundMeContract =  getEthereumFundMeContract();   // the variable 'fundMeContract' can then be used to pull all the functions in our FundMe contract.
            const parseEthAmountIntoGwei = ethers.utils.parseEther(ethAmount);           
            
            addressToFund = contractAddress; 

            // let's send some ethereum now...
            // await ethereum.request({
            //     method: "eth_sendTransaction",
            //     params: [{
            //         from: currentAccount,
            //         to: addressToFund,
            //         //gas: "0x5208",  //21000 gwei
            //         value: parseEthAmountIntoGwei._hex,  // 0.001                                                    
            //     }],
            // });

                // save the crowdfunding transaction to the Blockchain
                const crowFundTransactionHash = await fundMeContract.addCrowFundTransactionToBlockchain(addressToFund, parseEthAmountIntoGwei, messageFund, keywordFund);   // this asynchronous action requires a Loading state to hide the time it takes...

                setIsLoading(true);
                console.log(`Loading ... ${crowFundTransactionHash.hash}`);
                await crowFundTransactionHash.wait();  //for the transaction to be finished            
                console.log(`Success ---> ${crowFundTransactionHash.hash}`);
                setIsLoading(false);

                const crowFundTransactionCount = await fundMeContract.getCrowFundTransactionCount();
                setCrowFundTransactionCount(crowFundTransactionCount.toNumber());
                window.location.reload();
            } else {
                console.log("Aucun objet ethereum détecté !");
            }   
         } catch(error) {
          console.log(error);
         } 
    };


    // Fund contract
    const fund = async () => {    
        const {addressToFund ,ethAmount, keywordFund, messageFund} = formDataFund;      
     
        console.log(`Start funding with ${ethAmount}...`);
        
        if (typeof window.ethereum !== "undefined") {                     
                
            try {     
                             
                const provider = new ethers.providers.Web3Provider(ethereum);   
                const signer = provider.getSigner();
                const fundMeContract = new ethers.Contract(contractAddress, contractABI, signer);

                //const fundMeContract = getEthereumFundMeContract();
            
                const parseAmount = ethers.utils.parseEther(ethAmount)._hex;

                const transactionResponse = await fundMeContract.fund({value: parseAmount});
                console.log(` transaction response: ${transactionResponse}`);

               
                // listening for the txn to be mined...basically wait for the tx to end and stop there waiting till 'listenForMiningTransaction()' is completely done
                //..Ooh 'listenForMiningTransaction' is returning a promise, so wait for the promise to resolve or to reject
                await listenForMiningTransaction(transactionResponse, provider);
                console.log("All Done !")  
                
                sendCrowFundTransactionToBlockchain();
                getAllCrowFundTransactions();
                openModal_fund();            
                
            } catch (error) {
                console.log(error);
            }                     
        }       
    };

    // callback listener
    function listenForMiningTransaction(transactionResponse, provider) {
        console.log(`Start mining transaction - ${transactionResponse.hash}. . .`);
        // listening for the till we get the txnReceipt which is a parameter for our callback listener
        // ... so as soon as provider.once notices that the txnResponse.hash ended and produced a tnxReceipt, it passes tnxReceipt to the listener
        //...the problem here is that 'listenForMiningTransaction' finishes before 'provider.once()' finishes (event loop)
        return new Promise((resolve, reject) => {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(`Transaction receipt Completed with ${transactionReceipt.confirmations} confirmation(s)`)
                resolve(); // resolve the promise only when 'transactionResponse.hash' and the 'transactionReceipt' are found.                
           })
        })        
    };

    // reading from the Blockchain
    const getContractBalance = async () => {         
        if (typeof window.ethereum !== "undefined") {
            try {
                /* J'ai besoin de: provider -- contractAddress pour lire sur le contrat */
                const provider = new ethers.providers.Web3Provider(ethereum);
                const contractBalance = await provider.getBalance(contractAddress);                
                const parseContractBalance = ethers.utils.formatEther(contractBalance);   //easy read ethers formatted numbers 
                console.log(`Contract balance: ${parseContractBalance}`);
                openModal_balance();                                                                            
            } catch (error) {
                console.log(error);
            }                               
        }
                       
    };


    const withdrawContractFunds = async () => {
        if (typeof window.ethereum !== "undefined") {
            console.log("Withdrawing contracts' funds...");
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const fundMeContract = new ethers.Contract(contractAddress, contractABI, signer);              
            try {
                const transactionResponse = await fundMeContract.withdraw();
                await listenForMiningTransaction(transactionResponse, provider);
            } catch (error) {
                console.log(error);
            }
        }
    };



    // checking the wallet connection at the start of the application...
    // useEffect listsens to 'transactionCount' and calls the functions 'checkWalletConnection' and 'checkTransactionExistance' to reflect it on the front end
    useEffect(() => {
        checkWalletConnection();
        checkTransactionExistance();
    }, [transactionCount, crowfundTransactionCount]);          

  
    return (
        <FundMeContext.Provider  value={{ Modal_fund, Modal_balance, showModal, setShowModal,showModal_balance, setShowModal_balance,transactionCount, crowfundTransactionCount, connectWallet, currentAccount, 
        formData, setFormData, formDataFund, setFormDataFund, handleChange, sendTransaction, fund, withdrawContractFunds,sendCrowFundTransactionToBlockchain, 
        getAllCrowFundTransactions, getContractBalance, transactions, crowdfundTransactions, isLoading}}>        
            { children }
        </FundMeContext.Provider>
    );  
}

