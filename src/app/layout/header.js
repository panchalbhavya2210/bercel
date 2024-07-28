"use client";
import Image from "next/image";
import CartIcon from "../../../public/icons/cart.svg";
import UserIcon from "../../../public/icons/user.svg";
import MenuIcon from "../../../public/icons/menu.svg";
import CloseIcon from "../../../public/icons/close.svg";
import Link from "next/link";
import { useState, useEffect } from "react";

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
          <Link href="/">HOMELY.</Link>
        </div>
        <button
          className="hamburger  md:hidden lg:hidden sm:hidden cursor-pointer"
          onClick={setMenuState}
          aria-label="Menu button"
        >
          <Image src={MenuIcon} alt="Menu logo" />
        </button>
        {/* Menu for wider screens */}
        <div className="navItems  list-none justify-evenly lg:w-3/6 md:w-3/6  hidden md:flex lg:flex sm:flex sm:w-3/4 items-center">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">About</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">
            <Image src={CartIcon} alt="Cart Icon" />
          </Link>
          <li className="border-purple-900 border-2 rounded-full p-1">
            <Image src={UserIcon} alt="User Profile Icon" />
          </li>
        </div>
        {/* Menu for mobile */}
        <div
          className={`navItem list-none justify-evenly items-center absolute w-full left-0 right-0 top-0 bg-[#fff] shadow-lg ${
            menuOpen ? "" : "h-0 overflow-hidden "
          } leading-loose`}
        >
          <div className="p-5">
            <Link href="/">
              <button onClick={setMenuState} aria-label="Home button">
                Home
              </button>
            </Link>
            <br />
            <Link href="/about">
              <button onClick={setMenuState} aria-label="About button">
                About
              </button>
            </Link>
            <br />
            <Link href="/shop">
              <button onClick={setMenuState} aria-label="Shop Button">
                Shop
              </button>
            </Link>
            <br />
            <Link href="/contact">
              <button onClick={setMenuState} aria-label="Contact button">
                Contact
              </button>
            </Link>

            <span className="flex w-full justify-around items-center">
              <Link href="/cart">
                <button onClick={setMenuState} aria-label="Cart button">
                  <Image
                    src={CartIcon}
                    alt="Cart Icon"
                    className="w-8 h-auto"
                  />
                </button>
              </Link>
              <Link href="/" aria-label="Profile button">
                <button>
                  <Image
                    src={UserIcon}
                    alt="User Profile Icon"
                    className="w-8 h-auto"
                  />
                </button>
              </Link>
              <Link href="">
                <button onClick={setMenuState} aria-label="Close icon">
                  <Image
                    src={CloseIcon}
                    alt="User Profile Icon"
                    className="w-8 h-auto"
                  />
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
