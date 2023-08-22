import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";

const PostCreate = (props) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const [errorTitle, setErrorTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorTags, setErrorTags] = useState("");
    const [errorSelectedCategory, setErrorSelectedCategory] = useState("");

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
        setErrorTitle("");
        setErrorDescription("");
        setErrorTags("");
        setErrorSelectedCategory("");
        if (title.trim() === "") {
            setErrorTitle("News is required")
        }
        if (description.trim() === "") {
            setErrorDescription("Description is required")
        }
        if (tags.trim() === "") {
            setErrorTags("Tags is required")
        }
        if (selectedCategory.trim() === "") {
            setErrorSelectedCategory("Category is required")
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        formData.append("category_id", selectedCategory);
        if (image) {
            formData.append("image", image);
        }

        Inertia.post("/news", formData);
        setImage(null);
        setTitle("");
        setDescription("");
        setTags("");
        setSelectedCategory("");
    };
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <AuthenticatedLayout
                user={props.auth.user}
                header={
                    <div className="flex">
                        <Link
                            href={route("myNews")}
                            method="get"
                            as="button"
                            className="hover:text-slate-950"
                        >
                            My News
                        </Link>{" "}
                        <span className="mx-2">/</span>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Create News
                        </h2>
                    </div>
                }
            >
                <div className="max-w-7xl mx-auto mt-4 sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isNotif && (
                            <div className="alert alert-success mb-4">
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
                                <span>
                                    {props.flash.message}
                                </span>
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="m-2 input input-bordered form-input rounded w-full"
                        />

                        <input
                            type="text"
                            placeholder="Title"
                            className="m-2 input input-bordered w-full"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        {errorTitle && (
                            <div className="ml-4 text-error">{ errorTitle }</div>
                        )}

                        <select
                            className="m-2 select select-bordered w-full"
                            value={selectedCategory}
                            onChange={(event) =>
                                setSelectedCategory(event.target.value)
                            }
                        >
                            <option value="" disabled>
                                Choice the category
                            </option>
                            {props.categories.map((data) => (
                                <option key={data.id} value={data.id}>
                                    {data.name}
                                </option>
                            ))}
                        </select>
                        {errorSelectedCategory && (
                            <div className="ml-4 text-error">{ errorSelectedCategory }</div>
                        )}

                        <textarea
                            type="text"
                            placeholder="Deskripsi"
                            style={{ height: `${5 * 1.5}rem` }}
                            className="m-2 input input-bordered w-full"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        ></textarea>
                        {errorDescription && (
                            <div className="ml-4 text-error">{ errorDescription }</div>
                        )}

                        <input
                            type="text"
                            placeholder="Tags (separated by comma)"
                            className="m-2 input input-bordered w-full"
                            value={tags}
                            onChange={(event) => setTags(event.target.value)}
                        />
                        {errorTags && (
                            <div className="ml-4 text-error">{ errorTags }</div>
                        )}

                        <button
                            className="m-2 btn btn-primary w-full"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default PostCreate;
