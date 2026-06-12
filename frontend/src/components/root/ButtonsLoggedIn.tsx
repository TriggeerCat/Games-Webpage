import React from "react";

import { CoolLink } from "../CoolLink";

export const ButtonsLoggedIn = () => {
    return (
        <div className="flex gap-10">
            <CoolLink to="/room/actions/create">Створити кімнату</CoolLink>
            <CoolLink to="/room/actions/join">Доєднатись до кімнати</CoolLink>
            <CoolLink to="/games">Перегляд ігор</CoolLink>
            <CoolLink to="/player/update">Перестворити себе</CoolLink>
        </div>
    );
};
