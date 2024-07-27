"use client";
import Image from "next/image";
import CartIcon from "../../../public/cart.svg";
import UserIcon from "../../../public/user.svg";
import Link from "next/link";
import { useState } from "react";
export default function Header() {
  const [menuOpen, setMenuStatus] = useState(false);

  function setMenuState() {
    if (!menuOpen) {
      setMenuStatus(true);
    } else {
      setMenuStatus(false);
    }
  }
  return (
    <header>
      <div className="flex justify-between p-7">
        <div className="title text-xl font-[800] text-dark-purple tracking-wider">
          HOMELY.
        </div>
        <button
          className="hamburger  md:hidden lg:hidden cursor-pointer"
          onClick={setMenuState}
        >
          Hamy
        </button>
        {/* Menu for wider screens */}
        <div className="navItems sm:hidden list-none justify-evenly w-3/6 items-center hidden md:flex lg:flex ">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">About</Link>
          <li>Shop</li>
          <li>Contact</li>
          <li>
            <Image src={CartIcon} alt="Cart Icon" />
          </li>
          <li className="border-purple-900 border-2 rounded-full p-1">
            <Image src={UserIcon} alt="User Profile Icon" />
          </li>
        </div>
        {/* Menu for mobile */}
        <div
          className={`navItem list-none justify-evenly items-center absolute w-full left-0 right-0 top-0 bg-[#fff] shadow-lg ${menuOpen ? "" : "h-0 overflow-hidden "
            } leading-loose`}
        >
          <ul className="p-5">
            <Link href="/">
              <button onClick={setMenuState}>Home</button>
            </Link>
            <br />
            <Link href="/about">
              <button onClick={setMenuState}>About</button>
            </Link>
            <br />
            <button onClick={setMenuState}>Shop</button>
            <br />
            <button onClick={setMenuState}>Contact</button>

            <span className="flex w-full justify-around items-center">
              <button>
                <Image src={CartIcon} alt="Cart Icon" />
              </button>
              <button>
                <Image src={UserIcon} alt="User Profile Icon" />
              </button>
              <button onClick={setMenuState}>
                <Image src={UserIcon} alt="User Profile Icon" />
              </button>
            </span>
          </ul>
        </div>
      </div>
    </header>
  );
}
