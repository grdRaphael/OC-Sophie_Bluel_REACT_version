
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home/Home"
import LoginPage from "./pages/Login/LoginPage"
import Layout from "./components/Layout/Layout"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router