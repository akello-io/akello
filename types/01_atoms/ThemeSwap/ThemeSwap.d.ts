import React from 'react';
export interface ThemeSwapProps {
    theme: string;
    setTheme: (theme: string) => void;
}
declare const ThemeSwap: (props: ThemeSwapProps) => React.JSX.Element;
export default ThemeSwap;
