import { CryptoContext } from "@/Context API/Context";
import { useContext } from "react";


const useCryptoContext = () => {
    const allContext = useContext(CryptoContext);
    return allContext; 
};

export default useCryptoContext;