import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const About = ({ title, auth }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={title} />
            <AuthenticatedLayout user={auth.user}>
                <div className="flex flex-col lg:flex-wrap p-8">
                    <h1 className="mb-4 font-bold">About Me</h1>
                    <h3>Hi, my name is Rama Alfin Baehaqi!</h3>
                    <p className="mt-4">Currently i have internship in PT Indi Teknokreasi Internasional as Fullstack Web Developer. This website using Laravel as a Backend, React as a Library UI with Inertia JS and Laravel Breeze for Authentication system. Hopefully you can enjoy using this website.</p>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};
export default About;
