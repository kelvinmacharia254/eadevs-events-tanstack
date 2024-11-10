import {Outlet} from "react-router-dom";

export default function EventDetails(){
    return (
        <>
            <Outlet/>
            <h1>Event Details</h1>
        </>
    )
}