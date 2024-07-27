import Image from "next/image";
import CartIcon from "../../../public/cart.svg"
import UserIcon from "../../../public/user.svg"
import Link from "next/link";
export default function Header() {
    return (
        <header>
            <div className="flex justify-between p-7">
                <div className="title text-xl font-[800] text-purple-800 tracking-wider">
                    HOMELY.
                </div>
                <div className="navItems flex list-none justify-evenly w-3/6 items-center">
                    <li>Home</li>
                    <li>About</li>
                    <li>Shop</li>
                    <li>Contact</li>
                    <li>
                        <Image src={CartIcon} />
                    </li>
                    <li className="border-purple-900 border-2 rounded-full p-1">
                        <Image src={UserIcon} />
                    </li>
                </div>
            </div>
        </header>
    );
}