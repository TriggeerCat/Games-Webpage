import {createLink, LinkComponent} from "@tanstack/react-router";
import React from "react";

const StyledLink = React.forwardRef<HTMLAnchorElement>(
    (props, ref) => {
        const delay = -Math.floor(Math.random() * 1000);

        return (
            <a ref={ref} {...props} className='rounded-xl floating-up-down text-xl px-4 py-2 font-bold text-neutral-900 bg-linear-to-r from-[#EAC5D8] to-[#DBD8F0]'
               style={{animationDelay: `${delay}ms`}}/>
        )
    },
)

export const CoolLinkComponent = createLink(StyledLink);

export const CoolLink: LinkComponent<typeof StyledLink> = (props) => {
    return <CoolLinkComponent preload={'intent'} {...props} />
}