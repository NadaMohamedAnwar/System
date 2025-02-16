import React from "react";
import SidebarMenu from "../Layouts/sidemenue";

function Home() {
    return(
        <div className="d-flex">
            <SidebarMenu/>
            <div className="flex-grow-1 p-4">
                <h2>Main Content</h2>
                <p>This is the main content area.</p>
            </div>
        </div>
    )
}
export default Home;