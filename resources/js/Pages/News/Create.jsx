import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useEffect } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";

const PostCreate = () => {
    const { categories, title, auth, flash, errors} = usePage().props;
    const { data, setData, post, processing, progress} = useForm({
        image: null,
        title: "",
        description: "",
        tags: "",
        category_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('news.store'));
    };

    useEffect(() => {
        if (flash.message) {
            const timeout = setTimeout(() => {
                Inertia.reload({ only: ["flash"] });
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [flash.message]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={title} />
            <AuthenticatedLayout
                user={auth.user}
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
                        {flash.message && (
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
                                <span>{flash.message}</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="ml-2 form-control" htmlFor="image">Input Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="m-2 input input-bordered form-input rounded w-full"
                                />
                                {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="ml-2 form-control" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    className="m-2 input input-bordered w-full"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData("title", event.target.value)
                                    }
                                />
                                {errors.title && (
                                    <div className="text-error ml-2">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="ml-2 form-control" htmlFor="select_category">Select Category</label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    className="m-2 select select-bordered w-full"
                                    value={data.category_id}
                                    onChange={(event) =>
                                        setData("category_id", event.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Choice the category
                                    </option>
                                    {categories.map((data) => (
                                        <option key={data.id} value={data.id}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <div className="text-error ml-2">
                                        {errors.category_id}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="ml-2 form-control" htmlFor="description">Description</label>
                                <textarea
                                    type="text"
                                    placeholder="Deskripsi"
                                    style={{ height: `${5 * 1.5}rem` }}
                                    className="m-2 input input-bordered w-full"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData("description", event.target.value)
                                    }
                                ></textarea>
                                {errors.description && (
                                    <div className="text-error ml-2">
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="ml-2 form-control" htmlFor="tags">Tags</label>
                                <input
                                    type="text"
                                    placeholder="Tags (separated by comma)"
                                    className="m-2 input input-bordered w-full"
                                    value={data.tags}
                                    onChange={(event) =>
                                        setData("tags", event.target.value)
                                    }
                                />
                                {errors.tags && (
                                    <div className="text-error ml-2">
                                        {errors.tags}
                                    </div>
                                )}
                            </div>

                            <button
                                className="m-2 btn btn-primary w-full"
                                disabled={processing}
                            >
                                {processing ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default PostCreate;
