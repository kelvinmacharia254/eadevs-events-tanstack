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

export function useSearchEventQuery(searchTerm) {
    return useQuery({
        queryKey:["events", {searchTerm: searchTerm}], //
        queryFn: ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}), //signal:allows the request to be canceled if it’s still pending, to prevent race conditions or unnecessary network usage if the user changes the search term quickly.
        enabled: searchTerm !== undefined, // Controls when this query is active by allowing fetching if there is a searchTerm.
    })
}