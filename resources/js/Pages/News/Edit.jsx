import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useEffect } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";

export default function EditNews() {
    const { myNews, categories, title, auth, flash } = usePage().props;
    const { data, setData, put, processing, progress, errors: formErrors } = useForm({
        image: null,
        title: myNews.title,
        category_id: myNews.category_id,
        description: myNews.description,
        tags: myNews.tags.map((tag) => tag.name).join(", "),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("news.update", myNews.id));
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
        <div className="min-h-screen bg-slate-50 ">
            <Head title={title}></Head>
            <AuthenticatedLayout
                user={auth.user}
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
                            {flash.message && (
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
                                    <span>{flash.message}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="ml-2 form-control" htmlFor="image">Input Image</label>
                                    <input
                                        type="file"
                                        className="m-2"
                                        onChange={e => setData('image', e.target.files[0])}
                                    />
                                    {progress && (
                                        <progress value={progress.percentage} max="100">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    {myNews.image && (
                                        <div className="my-2">
                                            <img
                                                src={`/storage/news/${myNews.image}`}
                                                alt="News Image"
                                                className="my-2 w-96"
                                            />
                                            <div className="mt-2">
                                                Existing Image: {myNews.image}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="ml-2 form-control" htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="m-2 input input-bordered w-full"
                                        defaultValue={data.title}
                                        onChange={(event) =>
                                            setData("title", event.target.value)
                                        }
                                    />
                                    {formErrors.title && (
                                        <div className="text-error ml-2">
                                            {formErrors.title}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="ml-2 form-control" htmlFor="category_id">Select Category</label>
                                    <select
                                        className="m-2 select select-bordered w-full"
                                        value={data.category_id}
                                        onChange={(event) =>
                                            setData('category_id', event.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Choice the category
                                        </option>
                                        {categories.map((category) =>
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        )}
                                    </select>
                                    {formErrors.category_id && (
                                        <div className="text-error ml-2">
                                            {formErrors.category_id}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="ml-2 form-control" htmlFor="description">Description</label>
                                    <textarea
                                        type="text"
                                        placeholder="Description"
                                        className="m-2 input input-bordered w-full"
                                        style={{ height: `${5 * 1.5}rem` }}
                                        defaultValue={data.description}
                                        onChange={(event) =>
                                            setData('description', event.target.value)
                                        }
                                    ></textarea>
                                    {formErrors.description && (
                                        <div className="text-error ml-2">
                                            {formErrors.description}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="ml-2 form-control" htmlFor="tags">Tags</label>
                                    <input
                                        type="text"
                                        placeholder="Tags (separated by comma)"
                                        className="m-2 input input-bordered w-full"
                                        defaultValue={data.tags}
                                        onChange={(event) =>
                                            setData('tags', event.target.value)
                                        }
                                    />
                                    {formErrors.tags && (
                                        <div className="text-error ml-2">
                                            {formErrors.tags}
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
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
