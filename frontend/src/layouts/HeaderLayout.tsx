import { Link } from "@tanstack/react-router";

export const HeaderLayout = () => {
    return (
        <div className="p-2 flex gap-2 w-full">
            <Link to="/" className="[&.active]:font-bold">
                Головна
            </Link>
            <Link to="/session" className="[&.active]:font-bold">
                Сесії
            </Link>
            <Link to="/library" className="[&.active]:font-bold">
                Бібліотека
            </Link>
        </div>
    );
};