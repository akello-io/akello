import React, {ReactNode} from 'react';
import classNames from "classnames";

export interface TopNavigationProps {
    signIn: () => void
    signOut: ((data?: any | undefined) => void) | undefined
    profile_img: string
    github_url?: string
    signed_in: boolean
}

const TopNavigation = (props: TopNavigationProps) => {

    return (
        <>
            <div className="navbar bg-base-100">
                <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
                {props.signed_in && (
                    <div className="flex-none">
                        <label htmlFor="nav-drawer" className="btn btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                )}
                <div className="flex-1">
                    <p className="font-semibold normal-case text-xl">akello.io</p>
                </div>
                <div className="flex-none gap-2">
                    { !props.signed_in && (
                        <div className="btn btn-ghost" onClick={props.signIn}>
                            Login
                        </div>
                    )}

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={() => {
                            if(props.github_url) {
                                window.location.href = props.github_url;
                            }
                        }}>
                            <div className="w-10 rounded-full">
                                <img src={props.profile_img} />
                            </div>
                        </label>
                        {
                            props.signed_in && (
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a onClick={props.signOut}>Logout</a></li>
                                </ul>
                            )
                        }
                    </div>
                </div>

                <div className="drawer-side">
                    <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>

                    </ul>
                </div>
            </div>
        </>
    )
};

export default TopNavigation;
