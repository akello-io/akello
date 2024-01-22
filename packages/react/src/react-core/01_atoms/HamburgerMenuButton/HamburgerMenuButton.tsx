import React from 'react';

export interface HamburgerMenuButtonProps {
    htmlFor: string
}

const HamburgerMenuButton = (props: HamburgerMenuButtonProps) => {

    return (
        <>
            <label htmlFor={props.htmlFor} className="btn btn-ghost drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
        </>
    )
};

export default HamburgerMenuButton;
