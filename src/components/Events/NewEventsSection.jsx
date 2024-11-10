import {useEventsQuery} from "../../services/queries.js";
import EventItem from "./EventItem.jsx";

export default function NewEventsSection(){
    const {data,isPending,isError, error} = useEventsQuery();


    let content;

    if(isPending){
        content = <p>Loading...</p>;
    }

    if(isError){
        content = <p>An error occurred: {error.message}</p>;
    }

    if(data){
        content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
    }

    return (
        <section
            id="new-events-section"
            className="content-section"
        >
            <header>
                <h2>Recently added events</h2>
            </header>
            {content}
        </section>
    )
}