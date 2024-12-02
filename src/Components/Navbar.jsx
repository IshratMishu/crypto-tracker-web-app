"use client"
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const pathname = usePathname();
    
    const navItems = [
        {
            title: "Crypto",
            path: "/"
        },
        {
            title: "Trending",
            path: "/trending"
        },
        {
            title: "Saved",
            path: "/saved"
        }
    ]

    return (
        <div>
            <Logo></Logo>
            <div className="list-none flex gap-2 border w-2/5 mx-auto px-2 py-1 text-sm rounded mt-5">

                {
                    navItems.map(nav => (<Link className={`bg-[--gray-200] text-[--gray-100] hover:text-[--blue] w-full text-center rounded cursor-pointer font-semibold ${pathname === nav.path ? 'bg-[--blue] text-black' : ''}`} href={nav.path} key={nav.path}>{nav.title}</Link>))
                }
            </div>
        </div>
    );
};

export default Navbar;