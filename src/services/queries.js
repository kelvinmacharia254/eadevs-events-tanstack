import {QueryClient, useQuery} from "@tanstack/react-query";
import {fetchEvents} from "./http.js";

export const queryClient = new QueryClient();

export function useEventsQuery(){
    return useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
        staleTime: 0, // data is considered stale after 0ms. This means that the query will always fetch the data from the server.
    })
}