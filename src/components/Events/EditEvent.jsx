import {Link, useNavigate, useParams} from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import {useEventQuery} from "../../services/queries.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import {useUpdateEvent} from "../../services/mutations.js";

export default function EditEvent(){
    const navigate = useNavigate()
    const params = useParams()

    // fetch events data for editing
    const {data, isPending, isError, error} = useEventQuery(params.id)

    // update event
    const {mutate} = useUpdateEvent(params.id)


    // handle form submission
    function handleSubmit(formData){
        console.log(`handleSubmit from EditEvent:--> ${JSON.stringify(formData)}`)
        mutate({id: params.id, event: formData})
        navigate("../")
    }

    // close modal by navigating to another route
    function handleCloseEditModal(){
        navigate("../")
    }

    let content

    if(isPending){
        content = (
            <div className="center">
                <LoadingIndicator/>
            </div>
        )
    }

    if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "failed to load event, check your inputs and try again later"
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

    return <Modal onClose={handleCloseEditModal}>{content}</Modal>
}