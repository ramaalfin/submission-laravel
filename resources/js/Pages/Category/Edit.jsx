import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useEffect } from "react";

const CategoryEdit = (props) => {
    const { category, flash, errors } = usePage().props;
    const { data, setData, put, processing } = useForm({ name: props.category.name });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("category.update", category.id));
    }

    useEffect(() => {
        if (flash.message) {
            const timeout = setTimeout(() => {
                Inertia.reload({ only: ["flash"] });
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [flash.message]);

    return(
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}/>
            <AuthenticatedLayout
                user={props.auth.user}
                header={
                    <div className="flex items-center">
                        <Link
                            href={route("category.index")}
                            method="get"
                            as="button"
                            className="hover:text-slate-950"
                        >
                            Back
                        </Link>{" "}
                        <span className="mx-2">/</span>
                        <h2 className="font-semibold text-gray-800 leading-tight">
                            Edit Category
                        </h2>
                    </div>
                }
            >
                <div className="max-w-7xl mx-auto mt-4 sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                                <span>
                                    {flash.message}
                                </span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                placeholder="Category Name"
                                className="m-2 input input-bordered w-full"
                                defaultValue={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            { errors.name && <div className="text-error ml-2">{errors.name}</div> }
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
    )
}

export default CategoryEdit;
