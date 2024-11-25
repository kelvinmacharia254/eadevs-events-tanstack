import {Link, Outlet} from "react-router-dom";
import Header from "../Header.jsx";
import EventsIntroSection from "./EventsIntroSection.jsx";
import EventsListingSection from "./EventsListingSection.jsx";
import {Fragment} from "react";
import FindEventSection from "./FindEventSection.jsx";

export default function Events(){
    return (
        <>
            <Outlet/>
            <Header>
                <Link to="/events/new" className="button">New Event</Link>
            </Header>
            <main>
                <EventsIntroSection/>
                <EventsListingSection/>
                <FindEventSection/>
            </main>
        </>
    )
}