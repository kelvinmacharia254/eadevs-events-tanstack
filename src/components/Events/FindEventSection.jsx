import {useQuery} from "@tanstack/react-query";
import {useRef, useState} from "react";
import {fetchEvents} from "../../services/http.js";
import EventItem from "./EventItem.jsx";
import {useSearchEventQuery} from "../../services/queries.js";

export default function FindEventSection(){
    const searchElement = useRef()
    const [searchTerm, setSearchTerm] = useState()

    const {data, isLoading,isError, error} = useSearchEventQuery(searchTerm)

    function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

    let content = <p>Enter Event name to search</p>

    if(isLoading){
        content = <p>Loading event</p>
    }

    if(isError){
        content = <p>An Error Occurred</p>
    }

    if (data){
        content = (
            <ul className="events-list">
                {data.map((event) => (
                    <li key={event.id}>
                        <EventItem event={event}/>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <section className="content-section" id="all-events-section">
            <header>
                <h2>Find your next event!</h2>
                <form onSubmit={handleSubmit} id="search-form">
                    <input
                        type="text"
                        placeholder="Search events"
                        ref={searchElement}
                    />
                    <button>Search</button>
                </form>
            </header>
            {content}
        </section>
    )
}