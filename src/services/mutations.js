import {useMutation} from "@tanstack/react-query";

import {createNewEvent} from "./http.js";
import {queryClient} from "./queries.js";
import {useNavigate} from "react-router-dom";

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