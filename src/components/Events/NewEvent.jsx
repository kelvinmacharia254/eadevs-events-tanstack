import {Link, useNavigate} from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";

import {useCreateEventMutation} from "../../services/mutations.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent(){
    const navigate = useNavigate();

    const {mutate, isPending, isError, error} = useCreateEventMutation();

    function handleCloseModal(){
        navigate("../") // navigate to the parent route
    }

    function handleSubmit(formData){
        mutate({event: formData});
    }

    return (
        <Modal  onClose={handleCloseModal}>
            <EventForm onSubmit={handleSubmit}>
                {isPending && <p>Submitting Your Event...</p>}
                {!isPending && (
                    <>
                        <Link to="../" className="button-text">Cancel</Link>
                        <button type="submit" className="button">Create</button>
                    </>
                )}
            </EventForm>
            {isError && (
            <ErrorBlock
              title="An Error Occurred"
              message={
                error.info?.message ||
                "failed to create event. Please check your inputs and try again"
              }
            />
          )}
        </Modal>
    )
}