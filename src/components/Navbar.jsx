import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 w-full py-5 sm:px-10 flex justify-between px-6 items-center text-white bg-transparent shadow-lg z-10 backdrop-blur-md">
            <nav className="flex w-full screen-max-width max-sm:px-10">
                <img src={appleImg} alt="apple" width={18} height={22} className="cursor-pointer" />
                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((nav, i) => (
                        <div key={i} className="px-5 text-lg cursor-pointer font-bold text-md text-gray hover:text-white transition-all duration-300">
                            {nav}
                        </div>
                    ))}
                </div>
                <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 cursor-pointer">
                    <img src={searchImg} alt="search" width={18} height={18} />
                    <img src={bagImg} alt="bag" width={18} height={18} />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
