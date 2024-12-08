import {useMutation} from "@tanstack/react-query";

import {createNewEvent, deleteEvent, updateEvent} from "./http.js";
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


export function useUpdateEvent(id){
    return useMutation({
        mutationFn: updateEvent,
        onMutate: (eventData) =>{
            // console.log(`onMutate from useUpdateEvent --> ${JSON.stringify(eventData)}`)
            const newEvent = eventData.event
            queryClient.cancelQueries({ queryKey: ["events", eventData.id] }) // pause the query, so we can update the cache to update the UI instantly
            const previousEvent = queryClient.getQueriesData(["events", eventData.id]) // get and store the previous event data to rollback if needed
            queryClient.setQueryData(["events", eventData.id], newEvent); // update the cache with the new event data
            return {previousEvent} // return the previous event data to rollback if needed. This will be passed to onError if an error occurs. React Query will automatically rollback the cache if an error occurs. We retrieve the previous event data from the context object in onError.
        },
        onError: (context) => {
        queryClient.setQueryData(["events", id], context.previousEvent); // rollback to the previous event data
        },

        onSettled: () => {
        queryClient.invalidateQueries(["events", id]);
    },
    })
}