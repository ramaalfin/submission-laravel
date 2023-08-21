import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Paginator from "@/Components/Homepage/Paginator";
import MyNewsList from "@/Components/News/MyNewsList";

export default function MyNews({ auth, myNews, flash }) {
    const [deleteMessage, setDeleteMessage] = useState(flash.message);
    useEffect(() => {
        if (deleteMessage) {
            const timeout = setTimeout(() => {
                setDeleteMessage("");
            }, 2000);
            return () => clearTimeout(timeout);
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My News
                </h2>
            }
        >
            <Head title="My News" />

            <div className="py-4">
                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap items-start gap-4 mx-8 my-4">
                    {deleteMessage && (
                        <div className="alert alert-success mb-4">
                            {deleteMessage}
                        </div>
                    )}
                    <MyNewsList myNews={myNews.data}></MyNewsList>
                </div>
            </div>
            <div className="row mt-3 flex justify-center items-center">
                <Paginator news={myNews} />
            </div>
        </AuthenticatedLayout>
    );
}
