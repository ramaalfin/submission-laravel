import React from "react";
import { Link } from "@inertiajs/react";

const Paginator = ({ categories }) => {
    const next = categories.next_page_url;
    const prev = categories.prev_page_url;
    const current = categories.current_page;

    return (
        <div className="btn-group mb-4">
            { prev && <Link href={prev} className="btn btn-inline">«</Link> }
            <button className="btn">{current}</button>
            { next && <Link href={next} className="btn btn-inline">»</Link>}
        </div>
    )
}

export default Paginator;
