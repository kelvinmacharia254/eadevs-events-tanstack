import {useEventsQuery} from "../../services/queries.js";
import EventItem from "./EventItem.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
export default function EventsListingSection(){
    const {data,isPending,isError, error} = useEventsQuery();


    let content;

    if(isPending){
        content = (
            <LoadingIndicator/>
        )
    }

    if(isError){
        content = (
            <ErrorBlock
                title="An error occurred"
                message={error.info?.message || "failed to fetch events"}/>);
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