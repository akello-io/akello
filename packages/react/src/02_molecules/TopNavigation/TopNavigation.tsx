import React from 'react';
import classNames from "classnames";

export interface TopNavigationProps {
    logo: string
    profile_photo: string
    classNames: string
}

const TopNavigation = (props: TopNavigationProps) => {

    return (
        <>
            <div className={classNames( "navbar", props.classNames)}>
                <div className="flex-1">
                    <img src={props.logo} className={"w-12 h-auto"} />
                </div>

                <div className="flex-none gap-2">
                    <button className="btn btn-info rounded-md">Create Registry</button>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={props.profile_photo} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};

export default TopNavigation;
