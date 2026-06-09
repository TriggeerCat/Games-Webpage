import React from "react";

import { CoolLink } from "../CoolLink";

export const ButtonsLoggedOut = () => {
    return (
        <div className="flex gap-10">
            <CoolLink to="/player/create">Створити себе</CoolLink>
        </div>
    );
};
