import { navLinks } from "@/constants/navLinks";
import { FiSearch } from "react-icons/fi";
import Button from "../shared/Button";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed left-0 5xl:right-0 top-0 w-full !mx-auto lg:h-16 sm:h-14 5xl:h-18 h-12 flex items-center px-4 border-b border-base/10 z-50 bg-main">
      {/* Web Menu */}
      <div className="hidden w-full xl:flex items-center 3xl:gap-10 gap-5">
        <a
          href="/homepage"
          className="w-full max-w-[133px] 3xl:!mr-0 !mr-5 cursor-pointer"
        >
          <img
            src="/logo/logo-text.svg"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </a>

        <div className="w-full 5xl:max-w-[435px] 3xl:max-w-[335px] max-w-[235px] h-[35px] 5xl:h-[45px] transition-slow flex justify-center items-center gap-3 border border-base/10 py-3 px-3 rounded-sm focus-within:outline outline-neonAqua transition-default group">
          <FiSearch className="text-lg text-secondaryBase transition-default group-focus-within:text-neonAqua" />
          <input
            placeholder="Search anime series or movies"
            className="w-full text-secondaryBase text-[12px] 5xl:text-[16px] transition-slow outline-none"
          />
        </div>

        <ul className="flex justify-center items-center">
          {navLinks?.map((item, index) => {
            const isActive = location.pathname === item.href;

            return (
              <li
                key={index}
                className="flex justify-center items-center px-5 py-2"
              >
                <a
                  href={item.href}
                  className={`5xl:text-[17px] transition-slow relative font-medium tracking-wide
                ${isActive ? "text-neonAqua" : "text-white hover:text-neonAqua"}
                after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:w-0 after:h-[2px] after:bg-neonAqua after:transition-all after:duration-300
                hover:after:w-full hover:after:left-0`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hidden xl:block">
        <Button colorType={"primary"} />
      </div>

      {/* Dark background overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
            onClick={() => setShowMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <div className="relative xl:hidden w-full flex justify-between items-center z-30">
       <div className="w-full sm:hidden">
       <a href="/">
          <img src="/logo/logo.svg" alt="logo-icon" className="h-6" />
        </a>
       </div>

        <motion.a href="/" className="absolute">
          <motion.img
            src="/logo/logo-text.svg"
            alt="logo-text"
            initial={false}
            animate={{ opacity: isSearchVisible ? 0 : 1 }}
            transition={{
              duration: 0.3,
              delay: isSearchVisible ? 0 : 0.4,
            }}
            className="h-6 sm:hidden"
          />
        </motion.a>

        {/* Desktop logo */}
        <div className="w-full">
        <a href="/">
          <img
            src="/logo/logo-text.svg"
            alt="logo"
            className="sm:block hidden"
          />
        </a>
        </div>

        {/* Search bar */}
        <div className="flex gap-3">
          <motion.div
            ref={searchRef}
            animate={{ width: isSearchVisible ? "250px" : "35px" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center border border-base/10 sm:py-2 sm:px-[7px] py-[5px] px-[9px] rounded-md cursor-pointer gap-2 overflow-hidden focus-within:outline outline-neonAqua transition-default"
            onClick={() => setIsSearchVisible(true)}
          >
            <FiSearch
              className={`sm:text-xl text-[16px] ${
                isSearchVisible ? "text-neonAqua" : "text-secondaryBase"
              } shrink-0`}
            />
            <motion.input
              type="text"
              placeholder="Search anime series or movies"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isSearchVisible ? "100%" : 0,
                opacity: isSearchVisible ? 1 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="text-secondaryBase sm:text-sm text-[12px] outline-none bg-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>

          {/* Hamburger menu */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`transition-default ${showMenu ? "text-neonAqua" : ""}`}
          >
            <RxHamburgerMenu className="sm:text-[1.7rem] text-xl" />
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-10 right-0 bg-midnightNavy rounded-md p-3 flex flex-col justify-center items-start"
              >
                {navLinks?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="w-full flex justify-start items-center text-neonAqua p-2 active:bg-neonAqua active:text-main focus:bg-neonAqua focus:text-main transition-default sm:rounded-md rounded-sm"
                    >
                      <a href={item.href}>
                        <p className="font-semibold tracking-wide sm:text-[16px] text-sm">
                          {item.label}
                        </p>
                      </a>
                    </li>
                  );
                })}

                <div className="!mt-2">
                  <Button colorType={"secondary"} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
