
export default function NewEventsSection(){

    let content;

    content = "List of Events"
    return (
        <section
            id="new-events-section"
            className="content-section"
        >
            <header>
                <h2>Recently added events</h2>
            </header>
            {content}
        </section>
    )
}