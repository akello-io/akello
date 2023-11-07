import React, {ReactNode} from 'react';
import classNames from "classnames";

export interface TopNavigationProps {
    signIn: () => void
    signOut: ((data?: any | undefined) => void) | undefined
    profile_img: string
    github_url?: string
    signed_in: boolean
    theme_swapper: ReactNode
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
                        <>
                            <button className="btn btn-ghost" onClick={props.signIn}>
                                Sign In
                            </button>
                            <a className="btn btn-ghost" href={props.github_url}>
                                GitHub
                            </a>
                        </>
                    )}

                    { props.signed_in && (
                        <>
                            <button className="btn btn-ghost" onClick={props.signOut}>
                                Sign Out
                            </button>

                        </>
                        )
                    }
                    { props.theme_swapper }
                </div>

                <div className="drawer-side z-50">
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
