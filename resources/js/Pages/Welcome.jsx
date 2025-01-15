import { Link } from "@inertiajs/react";
import {
    BarChart3,
    CheckCircle,
    Clock,
    Layout,
    LineChart,
    Users,
    ArrowRight,
} from "lucide-react";

const Welcome = ({ auth }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Layout className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">
                                Task Management System
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {!auth ? (
                                <Link
                                    href="/login"
                                    className="bg-white text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 font-semibold py-2 px-6 rounded-lg"
                                >
                                    Login
                                </Link>
                            ) : (
                                <div className="flex items-center gap-4">
                                    {auth.role === "admin" && (
                                        <Link
                                            href={route("admin.dashboard")}
                                            className="bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white font-semibold py-2 px-6 rounded-lg"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    {auth.role === "employee" && (
                                        <Link
                                            href={route("employee.dashboard")}
                                            className="bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white font-semibold py-2 px-6 rounded-lg"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    {auth.role === "client" && (
                                        <Link
                                            href={"client.dashboard"}
                                            className="bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white font-semibold py-2 px-6 rounded-lg"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        href={route("logout")}
                                        className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white font-semibold py-2 px-6 rounded-lg"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <section className="bg-gradient-to-b from-indigo-50 to-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Manage Tasks{" "}
                        <span className="text-indigo-600">Efficiently</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Streamline your workflow, boost productivity, and
                        achieve your goals with our powerful task management
                        solution.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href={route("login")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="#features"
                            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 rounded-lg border border-gray-200 transition-colors duration-200"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">
                                10k+
                            </div>
                            <div className="text-gray-600">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">
                                50k+
                            </div>
                            <div className="text-gray-600">Tasks Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">
                                99%
                            </div>
                            <div className="text-gray-600">
                                Customer Satisfaction
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Powerful Features for Your Workflow
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={
                                <BarChart3 className="h-8 w-8 text-indigo-600" />
                            }
                            title="Project Overview"
                            description="Get a comprehensive view of your project's progress, milestones, and key metrics at a glance."
                        />
                        <FeatureCard
                            icon={<Clock className="h-8 w-8 text-indigo-600" />}
                            title="Time Tracking"
                            description="Track time spent on tasks and projects to optimize your team's productivity."
                        />
                        <FeatureCard
                            icon={<Users className="h-8 w-8 text-indigo-600" />}
                            title="Team Collaboration"
                            description="Work together seamlessly with real-time updates and communication tools."
                        />
                        <FeatureCard
                            icon={
                                <CheckCircle className="h-8 w-8 text-indigo-600" />
                            }
                            title="Task Management"
                            description="Create, assign, and track tasks with ease using our intuitive interface."
                        />
                        <FeatureCard
                            icon={
                                <LineChart className="h-8 w-8 text-indigo-600" />
                            }
                            title="Analytics"
                            description="Make data-driven decisions with detailed reports and analytics."
                        />
                        <FeatureCard
                            icon={
                                <Layout className="h-8 w-8 text-indigo-600" />
                            }
                            title="Custom Workflows"
                            description="Create custom workflows that match your team's unique processes."
                        />
                    </div>
                </div>
            </section>

            <section className="bg-indigo-600 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Transform Your Task Management?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of teams who have already improved their
                        productivity with our platform.
                    </p>
                    <Link
                        href={route("login")}
                        className="inline-flex items-center bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        Get Started Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">
                                About Us
                            </h3>
                            <p className="text-gray-400">
                                We provide powerful task management solutions to
                                help teams work more efficiently.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#features"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">
                                Resources
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">
                                Contact
                            </h3>
                            <ul className="space-y-2">
                                <li>Email: info@taskmanager.com</li>
                                <li>Phone: (555) 123-4567</li>
                                <li>Address: 123 Task Street</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p>
                            &copy; {new Date().getFullYear()} Task Management
                            System. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default Welcome;
