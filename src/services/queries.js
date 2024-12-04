import {QueryClient, useQuery} from "@tanstack/react-query";
import {fetchEvent, fetchEvents, fetchSelectableImages} from "./http.js";

export const queryClient = new QueryClient(); // Create a new instance of QueryClient to manage the cache and queries.

// fetch all events
export function useEventsQuery(){
    return useQuery({
        queryKey: ["events", {max: 3}],
        queryFn: ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}),
        staleTime: 0, // data is considered stale after 0ms. This means that the query will always fetch the data from the server.
    })
}

// fetch an event based on a search term
export function useSearchEventQuery(searchTerm) {
    return useQuery({
        queryKey:["events", {searchTerm: searchTerm}], //
        queryFn: ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}), //signal:allows the request to be canceled if it’s still pending, to prevent race conditions or unnecessary network usage if the user changes the search term quickly.
        enabled: !!searchTerm, // Controls when this query is active by allowing fetching if there is a searchTerm.
    })
}

// fetch an event of certain id for events pages
export function useEventQuery(id){
    return useQuery({
        queryKey: ["events", {id}],
        queryFn: ({signal}) => fetchEvent({signal, id:id}),
    })
}


export function useFetchImages(){
    return useQuery({
    queryKey: ["events-images"],
    queryFn: fetchSelectableImages,
  });
}