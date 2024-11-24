"use client";

import Link from "next/link";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import jonan from "@/public/jonan.webp";
import minions from "@/public/minions.webp";
import target from "@/public/target.webp";
import programmerhub from "@/public/programmerhub.webp";
import warzone from "@/public/warzone.webp";
import Image from "next/image";

interface NavProps {
  children: React.ReactNode;
}

const Nav = ({ children }: NavProps) => {
  return (
    <div className="flex text-gray-100 h-screen">
      <div className="bg-gray-900 p-3  overflow-y-scroll scrollbar-hide flex flex-col gap-y-2">
        <NavLink href="/">
          <DiscordIcon className="size-7" />
        </NavLink>

        <hr className="border-t-white/[.06] border-t-2 rounded mx-2" />

        <NavLink href="/servers/1/channels/1" serverNo={1}>
          <Image src={jonan} alt="Jonan" />
        </NavLink>

        <NavLink href="/servers/2/channels/17" serverNo={2}>
          <Image src={minions} alt="Minions" />
        </NavLink>

        <NavLink href="/servers/3/channels/28" serverNo={3}>
          <Image src={target} alt="Target" />
        </NavLink>

        <NavLink href="/servers/4" serverNo={4}>
          <Image src={programmerhub} alt="Programmerhub" />
        </NavLink>

        <NavLink href="/servers/5" serverNo={5}>
          <Image src={warzone} alt="Warzone" />
        </NavLink>
      </div>
      {children}
    </div>
  );
};

export default Nav;

interface NavLinkProps {
  children?: React.ReactNode;
  href: string;
  serverNo?: number;
}

function NavLink({ children, href, serverNo }: NavLinkProps) {
  const pathname = usePathname();
  const { id } = useParams();

  // Check if this is the home/root link and if we're currently on the home path
  const isHomeActive = href === "/" && pathname === "/";
  // Check if this is a server link and if it matches the current server
  const isServerActive = serverNo && +id! === serverNo;

  return (
    <Link href={href}>
      <div className="relative group">
        <div className="flex absolute -left-3 h-full items-center">
          <div
            className={`${
              isHomeActive || isServerActive
                ? "h-10"
                : "h-5 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100"
            } bg-white w-1  rounded-r  transition-all duration-200   origin-left`}
          ></div>
        </div>
        <div
          className={`${
            isHomeActive || isServerActive
              ? "rounded-2xl bg-brand text-white"
              : "group-hover:bg-brand group-hover:text-white transition-all duration-300 text-gray-100 bg-gray-700 rounded-3xl"
          }  size-12   group-hover:rounded-2xl flex items-center justify-center transition-all  group-active:translate-y-px overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}

function DiscordIcon(props) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19.73 4.87a18.2 18.2 0 00-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 00.96 17.7a18.43 18.43 0 005.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.35.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83zM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27z"
      />
    </svg>
  );
}
