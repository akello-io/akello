import React, {ReactNode} from 'react';
import HamburgerMenuButton from "../../01_atoms/HamburgerMenuButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import classNames from "classnames";

export interface TopNavigationProps {
    signIn: () => void
    signOut: ((data?: any | undefined) => void) | undefined
    profile_img: string
    github_url?: string
    signed_in: boolean
    menu_items: ReactNode
    theme_swapper: ReactNode
    y_scroll_position?: number
    sticky?: boolean
}

const TopNavigation = (props: TopNavigationProps) => {

    return (
        <>
            <div className={classNames(
                {
                    'bg-base-200/40': props.y_scroll_position! > 100,
                    'sticky': props.sticky
                },
                "navbar sticky top-0  py-4 border-b border-slate-900/10 lg:border-0 dark:border-slate-300/10 "
            )}>
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
