import { SiBitcoin } from "react-icons/si";

const Logo = () => {
    return (
        <div className="flex gap-1 items-center text-xl text-[--blue]">
            <SiBitcoin className="text-3xl"/>
            CryptoTracker
        </div>
    );
};

export default Logo;