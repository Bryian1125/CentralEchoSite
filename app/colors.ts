/**
 * Master color palette for Central Echo.
 * Derived from Navbar: #2794d8 (primary) and #FFFFFF (background).
 */

export const colors = {
    background: "#FFFFFF",
    foreground: "#0f172a",
    primary: "#2794d8",
    secondary: "#ceddea",
    text: "#0f172a",
    border: "#ceddea",
} as const;

export type ColorKey = keyof typeof colors;
