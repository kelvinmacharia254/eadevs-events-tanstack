import {Link, Outlet, useParams} from "react-router-dom";
import Header from "../Header.jsx";
import {useEventQuery} from "../../services/queries.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails(){
    const params = useParams()

    const {data, isPending, isError, error} = useEventQuery(params.id)

    let content;

    if (isPending) {
        content = (
            <div id="event-details-content" className="center">
                Fetching event data ...
            </div>
        )
    }

    if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "failed to fetch event details"}
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button >Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>

        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

    return (
        <>
            <Outlet/>
            <Header>
                <Link to="/events" className="nav-item">
                    View All Events
                </Link>
            </Header>
            <article id="event-details">
                {content}
            </article>
        </>
    )
}