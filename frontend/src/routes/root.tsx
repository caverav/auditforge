import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import ProtectedRoute from "../components/ProtectedRoute"

export const Root = () => {
    return (
        <>
            <ProtectedRoute>
                <Navbar/>
                <Outlet/>
            </ProtectedRoute>
        </>
    )
}
