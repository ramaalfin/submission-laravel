import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";
import Paginator from "@/Components/Category/Paginator";

const CategoryTable = ({ categories, title, auth, flash }) => {
    let counter = 1;
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const [errorMessage, setErrorMessage] = useState(flash.error);

    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage("");
            }, 2000);
            return () => clearTimeout(timeout);
        }

        if (errorMessage) {
            const timeout = setTimeout(() => {
                setErrorMessage("")
            }, 2000);
            return () => clearTimeout(timeout);
        }
    })

    const handleDelete = (id) => {
        if (confirm("Are you sure want to delete this category?")) {
            Inertia.delete(`/category/${id}`).then(() => {
                Inertia.reload({
                    only: ['flash']
                });
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={title} />
            <AuthenticatedLayout user={auth.user}>
                <div className="max-w-7xl mx-auto mt-4 sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            {successMessage && (
                                <div className="alert alert-success mb-4">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-error mb-4">
                                    {errorMessage}
                                </div>
                            )}
                            <Link
                                href={route("category.create")}
                                className="btn text-[12px] bg-blue-800 text-white rounded hover:bg-blue-900"
                            >
                                Create
                            </Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.data.map((data, i) => (
                                        <tr key={i}>
                                            <td>{counter++}</td>
                                            <td>{data.name}</td>
                                            <td className="flex items-center gap-4">
                                                <Link
                                                    href={route(
                                                        "category.edit",
                                                        { category: data.id }
                                                    )}
                                                    method="get"
                                                    as="button"
                                                    className="btn bg-yellow-500 hover:bg-yellow-600 text-[12px]"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(data.id)
                                                    }
                                                    className="btn bg-red-800 hover:bg-red-900 text-white text-[12px]"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 flex justify-center items-center">
                    <Paginator categories={categories}/>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default CategoryTable;
