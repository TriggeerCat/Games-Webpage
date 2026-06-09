import React from "react";

import { CoolLink } from "../CoolLink";

export const ButtonsLoggedIn = () => {
    return (
        <div className="flex gap-10">
            <CoolLink to="/room/create">Створити кімнату</CoolLink>
            <CoolLink to="/room/create">Доєднатись до кімнати (todo)</CoolLink>
            <CoolLink to="/games">Перегляд ігор</CoolLink>
            <CoolLink to="/player/update">Перестворити себе</CoolLink>
        </div>
    );
};
