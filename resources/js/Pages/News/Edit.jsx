import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function EditNews(props) {
    const [title, setTitle] = useState(props.myNews.title);
    const [description, setDescription] = useState(props.myNews.description);
    const [category, setCategory] = useState(props.myNews.category_id);
    const [tags, setTags] = useState(props.myNews.tags.map(tag => tag.name).join(", "));
    const [image, setImage] = useState(null);
    const [isNotif, setIsNotif] = useState(false);

    useEffect(() => {
        if (props.flash.message) {
            setIsNotif(true);
            setTimeout(() => {
                setIsNotif(false);
            }, 2000);
        }
    }, [props.flash.message]);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("title", title);
        formData.append("description", description);

        const tagsArray = tags.split(',').map(tag => tag.trim());
        formData.append("tags", tagsArray);

        formData.append("category_id", category);
        formData.append("_method", "PUT");

        Inertia.post(`/news/${props.myNews.id}`, formData);
    };

    return (
        <div className="min-h-screen bg-slate-50 ">
            <Head title={props.title}></Head>
            <AuthenticatedLayout
                user={props.auth.user}
                header={
                    <div className="flex">
                        <Link href={route("myNews")} method="get" as="button">
                            My News
                        </Link>{" "}
                        <span className="mx-2">/</span>
                        <h2 className="font-semibold text-gray-800 leading-tight">
                            Edit News
                        </h2>
                    </div>
                }
            >
                <div className="max-w-7xl mx-auto mt-4 p-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="card-body">
                            {isNotif && (
                                <div className="alert alert-success">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            )}

                            <input
                                type="file"
                                className="m-2"
                                onChange={handleImageChange}
                            />
                            {props.myNews.image && (
                                <img
                                    src={`/storage/news/${props.myNews.image}`}
                                    alt="News Image"
                                    className="my-2 w-96"
                                />
                            )}
                            <input
                                type="text"
                                placeholder="Title"
                                className="m-2 input input-bordered w-full"
                                defaultValue={props.myNews.title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />

                            <select
                                className="m-2 select select-bordered w-full"
                                defaultValue={props.myNews.category_id}
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Choice the category
                                </option>
                                {props.categories.map((data) =>
                                    data.id == props.myNews.category_id ? (
                                        <option key={data.id} value={data.id}>
                                            {data.name}
                                        </option>
                                    ) : (
                                        <option key={data.id} value={data.id}>
                                            {data.name}
                                        </option>
                                    )
                                )}
                            </select>

                            <textarea
                                type="text"
                                placeholder="Deskripsi"
                                className="m-2 input input-bordered w-full"
                                style={{ height: `${5 * 1.5}rem` }}
                                defaultValue={props.myNews.description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            ></textarea>

                            <input
                                type="text"
                                placeholder="Tags (separated by comma)"
                                className="m-2 input input-bordered w-full"
                                defaultValue={tags}
                                onChange={(event) => setTags(event.target.value)}
                            />

                            <button
                                className="m-2 btn btn-primary w-full"
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
