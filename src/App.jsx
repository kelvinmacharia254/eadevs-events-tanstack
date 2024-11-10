import {RouterProvider, createBrowserRouter, Navigate} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./services/queries.js";

import Events from "./components/Events/Events.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EventDetails from "./components/Events/EventsDetails.jsx";
import EditEvent from "./components/Events/EditEvent.jsx";


const router =createBrowserRouter( [
        {
          path:"/",
          element:<Navigate to ="events"/>
        },
        {
          path:"events",
          element:<Events/>,
          children: [
            {
              path:"/events/new",
              element:<NewEvent/>
            },
          ]
        },
        {
          path:"/events/:id",
          element:<EventDetails/>,
          children: [
            {
              path: "/events/:id/edit",
              element: <EditEvent/>
            },
            ]
        },
      ]
)
function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </>
  )
}

export default App
