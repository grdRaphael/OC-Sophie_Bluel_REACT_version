import Banner from "../Banner/Banner"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return(
        <>
            <Banner/>
            <main>
                <Outlet/>
            </main>

        </>
        
    )
}

export default Layout