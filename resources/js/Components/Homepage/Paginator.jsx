import React from "react";
import { Link } from "@inertiajs/react";

const Paginator = ({ news }) => {
    const next = news.next_page_url;
    const prev = news.prev_page_url;
    const current = news.current_page;

    return (
        <div className="btn-group mb-4">
            { prev && <Link href={prev} className="btn btn-inline">«</Link> }
            <button className="btn">{current}</button>
            { next && <Link href={next} className="btn btn-inline">»</Link>}
        </div>
    )
}

export default Paginator;
