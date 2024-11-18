export async function fetchEvents({signal, searchTerm, max}){
    let url = "http://localhost:3000/events";

    // extend url to include searchTerm
    if (searchTerm && max) {
        url += "?search=" + searchTerm + "&max=" + max;
    } else if (searchTerm) {
        url += "?search=" + searchTerm;
    } else if (max) {
        url += "?max=" + max;
    }

    const response = await fetch(url, {signal:signal});

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the events");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { events } = await response.json();

    return events;
}