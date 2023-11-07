import React, {ReactNode} from 'react';
import HamburgerMenuButton from "../../01_atoms/HamburgerMenuButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export interface TopNavigationProps {
    signIn: () => void
    signOut: ((data?: any | undefined) => void) | undefined
    profile_img: string
    github_url?: string
    signed_in: boolean
    menu_items: ReactNode
    theme_swapper: ReactNode
}

const TopNavigation = (props: TopNavigationProps) => {

    return (
        <>
            <div className="navbar bg-base-100">
                {props.signed_in && (
                    <div className="flex-none">
                        <HamburgerMenu>
                            { props.menu_items }
                        </HamburgerMenu>
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
            </div>
        </>
    )
};

export default TopNavigation;
