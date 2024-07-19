import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"

export const Root = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}
