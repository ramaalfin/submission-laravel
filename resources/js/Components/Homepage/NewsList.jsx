import { Link } from "@inertiajs/react";

const isNews = (news) => {
    return news.map((data, i) => {
        return (
            <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl">
                {data.image && (
                    <figure>
                        <img
                            src={`/storage/news/${data.image}`}
                            alt="News image"
                        />
                    </figure>
                )}
                <div className="card-body">
                    <h2 className="card-title">{data.title}</h2>
                    <p>{data.description}</p>

                    <div className="card-actions justify-between">
                        <div>
                            <Link href={route("news.show", { news: data.id })}>
                                Show more
                            </Link>
                        </div>
                        <div>
                            <div className="badge badge-outline">
                                {data.user.name}
                            </div>
                            <div className="badge badge-inline bg-slate-900 text-white">
                                {data.category.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
};

const noNews = () => {
    return <div className="">Currently no news available</div>;
};

const NewsList = ({ news }) => {
    return !news ? noNews() : isNews(news);
};
export default NewsList;
