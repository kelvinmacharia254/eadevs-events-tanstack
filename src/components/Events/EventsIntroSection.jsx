import {Link} from "react-router-dom";
import meetup from "./../../assets/meetup.jpg";

export default function EventsIntroSection(){
    return (
        <section
            id="overview-section"
            className="content-section"
            style={{ backgroundImage: `url(${meetup})` }}
        >
            <h2>Connect with amazing people <br/>
                or <strong>find a new passion</strong>
            </h2>
            <p>Anyone can organize and join events on React Event</p>
            <p>Find out what's happening in your community. From tech meetups to coding bootcamps, there's something for everyone!</p>
            <Link to="/events/new" className="button">Create your first event</Link>
        </section>
    )
}