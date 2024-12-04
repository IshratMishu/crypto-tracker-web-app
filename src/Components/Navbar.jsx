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
            <div className="list-none flex gap-2 border border-[--blue] lg:w-2/5 md:w-[75%] w-[95%] mx-auto px-2 py-1 rounded lg:mt-5 mt-10">

                {
                    navItems.map(nav => (<Link className={`bg-[--gray-200] text-[--gray-100] hover:text-[--blue] w-full text-center rounded cursor-pointer font-semibold ${pathname === nav.path ? 'bg-[var(--blue)] text-black hover:text-black' : ''}`} href={nav.path} key={nav.path}>{nav.title}</Link>))
                }
            </div>
        </div>
    );
};

export default Navbar;