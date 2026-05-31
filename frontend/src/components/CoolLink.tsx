import {Link} from "@tanstack/react-router";
import type {FC, ReactNode} from "react";

type PropsType = {
    to: string,
    children: ReactNode
}

export const CoolLink: FC<PropsType> = ({to, children}) => {
    const delay = -Math.floor(Math.random() * 1000);

    return (
        <div className='rounded-xl floating-up-down text-xl px-4 py-2 font-bold text-neutral-900 bg-linear-to-r from-[#EAC5D8] to-[#DBD8F0]'
             style={{ animationDelay: `${delay}ms` }}>
            <Link to={to}>
                {children}
            </Link>
        </div>
    );
};