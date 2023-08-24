import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditNews(props) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(
        props.news.category_id
    );

    const selectedCategory = props.categories.find(
        (category) => category.id == selectedCategoryId
    );

    return (
        <div className="min-h-screen bg-slate-50 ">
            <Head title={props.title}></Head>
            <AuthenticatedLayout
                user={props.auth.user}
                header={
                    <div className="flex">
                        <Link href={route("home")} method="get" as="button">
                            Home
                        </Link>{" "}
                        <span className="mx-2">/</span>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Detail News
                        </h2>
                    </div>
                }
            >
                <div className="max-w-7xl mx-auto mt-4 p-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="card-body">
                            {props.news.image && (
                                <img
                                    src={`/storage/news/${props.news.image}`}
                                    alt="News Image"
                                    className="my-2 w-96"
                                />
                            )}
                            <input
                                type="text"
                                placeholder="Title"
                                className="m-2 input input-bordered w-full"
                                defaultValue={props.news.title}
                                readOnly
                            />

                            <input
                                type="text"
                                className="m-2 input input-bordered w-full"
                                defaultValue={
                                    selectedCategory
                                        ? selectedCategory.name
                                        : ""
                                }
                                readOnly
                            />

                            <ReactQuill
                                readOnly
                                placeholder="Description"
                                defaultValue={props.news.description}
                                onChange={(value) =>
                                    setData("description", value)
                                }
                                modules={{
                                    toolbar: [
                                        [
                                            { header: "1" },
                                            { header: "2" },
                                            { font: [] },
                                        ],
                                        [
                                            { list: "ordered" },
                                            { list: "bullet" },
                                        ],
                                        ["bold", "italic", "underline"],
                                        [{ color: [] }, { background: [] }],
                                        ["link"],
                                        ["clean"],
                                    ],
                                }}
                            ></ReactQuill>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
