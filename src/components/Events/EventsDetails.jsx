import {Link, Outlet, useParams} from "react-router-dom";
import Header from "../Header.jsx";
import {useEventQuery} from "../../services/queries.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import {useState} from "react";
import Modal from "../UI/Modal.jsx";
import {useDeleteEventMutation} from "../../services/mutations.js";

export default function EventDetails(){
    const params = useParams()

    const [isDeleting, setIsDeleting] = useState(false);

    const {data,
        isPending,
        isError,
        error} = useEventQuery(params.id)

    const {mutate,
        isPending: isPendingDeletion,
        isError: isErrorDeletion,
        error: errorDeletion}  = useDeleteEventMutation()

    let content;

    function handleStartDelete(){
        setIsDeleting(true) // launch event deletion confirmation modal
    }

    function handleStopDelete() {
        setIsDeleting(false); // close event deletion confirmation modal
    }

    function handleDelete() {
        console.log("Deleting ... ")
        console.log("Event ID:", params.id);
        mutate({ id: params.id }); // delete the event
        console.log("Deletion complete.")
    }

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
            <button onClick={handleStartDelete}>Delete</button>
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
            {isDeleting && (
                <Modal>
                    <h2>Are you sure?</h2>
                    <p>Do you really want to delete this event?,
                        this action cannot be undone.
                    </p>
                    <div className="form-actions">

                        {!isPendingDeletion && (
                            <>
                                <button onClick={handleStopDelete} className="button-text">
                                    Cancel
                                </button>
                                <button onClick={handleDelete} className="button">
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                    {isErrorDeletion && (
                        <ErrorBlock
                        title="An error occurred"
                        message={errorDeletion.info?.message || "Failed to delete the event"}
                        />
            )}
                </Modal>
                )}
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