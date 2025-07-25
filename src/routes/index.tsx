import {createFileRoute} from '@tanstack/react-router'
import {CoolLink} from "../components/CoolLink.tsx";

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='flex flex-col items-center gap-10 mt-60'>
            <h1 className='w-full text-center text-7xl font-extrabold h-24 bg-clip-text animate-gradient bg-radial-[circle_at_center] from-[#3cff52] via-[#7182ff] to-[#3cff52] bg-[length:200%] text-transparent'>
                Головна сторінка
            </h1>
            <div className='flex gap-10'>
                <CoolLink to='/session'>Почати сесію</CoolLink>
                <CoolLink to='/session'>Доєднатись до сесії</CoolLink>
                <CoolLink to='/library'>Бібліотека карток</CoolLink>
            </div>
        </div>
    )
}
