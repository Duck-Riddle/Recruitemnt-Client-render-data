import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    html {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    *, ::after, ::before {
        box-sizing: inherit;
    }

    body {
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyle;
