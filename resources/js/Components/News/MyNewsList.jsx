import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const isMyNewsList = (myNews) => {
    const handleDelete = (id) => {
        if (confirm("Are you sure want to delete this news?")) {
            Inertia.delete(`/news/${id}`).then(() => {
                Inertia.reload({
                    only: ["flash"],
                });
            });
        }
    };

    return myNews.map((items, i) => {
        return (
            <div
            key={i}
            className="card w-full lg:w-96 bg-base-100 shadow-xl mb-4"
        >
            {items.image && (
                <figure>
                    <img
                        src={`/storage/news/${items.image}`}
                        alt="image news"
                    />
                </figure>
            )}
            <div className="card-body">
                <h2 className="card-title">
                    {items.title}
                </h2>
                <p>{items.description}</p>
                <div className="flex justify-between">
                    <div className="">
                        <div className="badge">
                            {items.user.name}
                        </div>
                        <div className="badge">
                            {items.category.name}
                        </div>
                    </div>
                    <div className="">
                        <div className="badge bg-warning">
                            <Link
                                href={route(
                                    "news.edit",
                                    { news: items.id }
                                )}
                                method="get"
                                as="button"
                            >
                                edit
                            </Link>
                        </div>
                        <div className="badge bg-red-600 text-white">
                            <button
                                onClick={() =>
                                    handleDelete(
                                        items.id
                                    )
                                }
                            >
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    })
}

const noMyNews = () => {
    return <div className="">Currently you don't have news</div>
}

const MyNewsList = ({ myNews, flash }) => {
    return !myNews ? noMyNews() : isMyNewsList(myNews, flash)
}
export default MyNewsList;
