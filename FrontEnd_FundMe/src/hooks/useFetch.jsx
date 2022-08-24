// this file will serve in fetching the Gifs based on a specific keyword

import { useEffect, useState } from "react";

const VITE_GiPHY_API_KEY  = import.meta.env.VITE_GiPHY_API_KEY;

//const VITE_GIPHY_API_KEY = process.env.VITE_GIPHY_API_KEY;

const useFetch = ({ keyword }) => {
    const [ gifUrl, setGifUrl] = useState("");

    const fetchGifs = async () => {
        try {
            // response from ghipy Api
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${VITE_GiPHY_API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const {data} = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium.url);
        } catch (error) {
            setGifUrl("https://media4.giphy.com/media/MT5UUV1d4CXE2A37Dg/giphy.gif?cid=ecf05e47w22ucbdc8nf4u5xy8lnzzeju2y0ymbdpf38sg3sy&rid=giphy.gif&ct=g");
        }
    }    

    useEffect(() => {
      if(keyword) fetchGifs();      
    }, [keyword])   // useEffect happens whenever the keyword changes...

    return gifUrl;
};


export default useFetch;

