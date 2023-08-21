import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Homepage(props) {
    const { title, auth } = props;
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={title} />
            <AuthenticatedLayout
                user={auth.user}
            >
                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap items-start gap-4 p-4">
                    <NewsList news={props.news.data} />
                </div>
                <div className="row mt-3 flex justify-center items-center">
                    <Paginator news={props.news}/>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
