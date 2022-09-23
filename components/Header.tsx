import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  //const session = false;
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);
  return (
    <>
      <header className="sticky top-0 flex items-center justify-between p-4 z-30 bg-[#E7ECEE]">
        <div className="flex items-center justify-center md:w-1/5">
          <Link href="/">
            <div className="relative w-12 h-12 cursor-pointer opacity-70 transition hover:opacity-100">
              <Image src="/Apple-Logo.png" layout="fill" objectFit="contain" />
            </div>
          </Link>
        </div>
        <div className="hidden flex items-center justify-center space-x-8 md:flex">
          <a className="headerLink">Product</a>
          <a className="headerLink">Explore</a>
          <a className="headerLink">Support</a>
          <a className="headerLink">Business</a>
        </div>
        <div className="flex items-center justify-center gap-x-4 md:w-1/5">
          <SearchIcon className="headerIcon" />
          <Link href="/checkout">
            <div className="relative cursor-pointer">
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                  {items.length}
                </span>
              )}
              <ShoppingBagIcon className="headerIcon" />
            </div>
          </Link>

          {session ? (
            <Image
              src={
                session.user?.image ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt=""
              className="cursor-pointer rounded-full"
              width={34}
              height={34}
              onClick={() => signOut()}
            />
          ) : (
            <UserIcon className="headerIcon" onClick={() => signIn()} />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
