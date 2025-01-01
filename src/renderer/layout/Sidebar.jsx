import { useState } from "react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { FileTextFilled, HomeFilled, TableOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import axios from 'axios';


export default function Sidebar({ outlet }) {
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();
    const [sideBar, setSideBar] = useState(window.innerWidth <= 768 ? false : true);
    const location = useLocation();

    const toggleSideBar = () => {
        setSideBar(!sideBar);
    };
    const navigate = useNavigate();
    const logOut = () => {
        axios.post('logout').then(function (response) {
            console.log(response)
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            localStorage.removeItem('router_id');
            navigate('/login');
        })
        // navigate('/login');
    }

    let sideBarClass = "lg:translate-x-0";
    if (window.innerWidth <= 768) sideBarClass = "translate-x-0"
    if (!sideBar) sideBarClass = ""

    let overlayClass = "hidden"
    if (sideBar && window.innerWidth <= 768) overlayClass = ""

    let contentClass = "lg:ml-56";
    if (!sideBar) contentClass = "";

    const routeActiveClass = "bg-slate-200"

    const logout = async () => {
        // axios.post('http://devtesteam.site/api/logout',
        //     {
        //         token: localStorage.getItem('session'),
        //     }).then(function (response) {
        //         console.log(response);
        //         localStorage.removeItem('session');
        //         localStorage.clear();
        //         navigate('/');
        //     }).catch(function (error) { 

        //     });
        console.log(localStorage.getItem('session'));
        localStorage.removeItem('session');
        console.log(localStorage.getItem('session'));
        // navigate('/login');
        window.location.href = "/login";
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
                <div className="px-3 py-1.5 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button onClick={toggleSideBar} aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Otorisator APPS</span>
                            </a>
                        </div>

                        {/* User Button Dropdown */}
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={"z-30 fixed top-0 left-0 right-0 bottom-0 bg-slate-600/50 " + overlayClass}></div>

            <div className="flex">
                <aside id="logo-sidebar" className={"fixed z-40 w-56 bg-white h-screen pt-16 shadow-sm transition-transform -translate-x-full border-gray-300 " + sideBarClass} aria-label="Sidebar">
                    <div className="h-full px-3 overflow-y-auto ">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to='/' className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-slate-200 group " + (location.pathname == '/admin' && routeActiveClass)}>
                                    <UserOutlined />
                                    <span className="ms-3">User List</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={logout} className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-slate-200 group " + (location.pathname == '/table/table-view' && routeActiveClass)}>
                                    <LogoutOutlined />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to='/interface' className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-slate-200 group " + (location.pathname == '/interface' && routeActiveClass)}>
                                    <FileTextFilled />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Interface</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/table/table-view' className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-slate-200 group " + (location.pathname == '/table/table-view' && routeActiveClass)}>
                                    <TableOutlined />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Routing</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={logOut} className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-slate-200 group " + (location.pathname == '/table/table-view' && routeActiveClass)}>
                                    <TableOutlined />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </aside>

                <div className={"p-8 mt-10 w-full bg-slate-100 h-screen " + contentClass}>
                    {outlet}
                    {/* <div class="grid grid-cols-3 gap-4 mb-4">
                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>

        </>
    );
};