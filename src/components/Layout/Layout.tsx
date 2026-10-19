import Banner from "../Banner/Banner"
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return(
        <>
            <Banner/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout
