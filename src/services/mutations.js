import {useMutation} from "@tanstack/react-query";

import {createNewEvent, deleteEvent} from "./http.js";
import {queryClient} from "./queries.js";
import {useNavigate} from "react-router-dom";

// create a new event
export function useCreateEventMutation(){
    const navigate = useNavigate()
    return useMutation({
        mutationFn: createNewEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["events"]});
            navigate("/events");
        },
    });
}

// delete an event
export function useDeleteEventMutation(){
    const navigate = useNavigate()
    return useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["events"],
                refetchType: "none", // prevent refetching
            });
            navigate("/events");
        },

        onError: (error) => {
            console.error("Error deleting event:", error);
        }
    });
}