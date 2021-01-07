import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss() {
    return `
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@800');

    body {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .frame {
        width: 80vw;
        height: 80vh;
        border-radius: 36px;
        border: #FFE86A 48px solid;
        position: absolute;
        top: calc(10vh - 48px);
        left: calc(10vw - 48px);
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .title {
        font-size: 96px;
        font-weight: bold;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        width: 70vw;
        height: 70vh;
        position: absolute;
        top: calc(12vh + 72px);
        left: calc(12vw + 72px);
    }

    .logo {
        position: absolute;
        bottom: 24px;
        right: 24px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }`
}

// const hinan = `
//         <div>
//             <div class="spacer">
//             <div class="logo-wrapper">
//                 ${images.map((img, i) =>
//                     getPlusSign(i) + getImage(img, widths[i], heights[i])
//                 ).join('')}
//             </div>
//             <div class="spacer">
//             <div class="heading">${emojify(
//                 md ? marked(text) : sanitizeHtml(text)
//             )}
//             </div>
//         </div>`

export function getHtml(parsedReq: ParsedRequest) {
    const { title } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
    <div class="frame"></div>
    <div class="title">
    ${emojify(sanitizeHtml(title))}
    </div>
    <div class="icon">
        ${getImage(
        "https://static.shinyaigeek.dev/static/icon_transparent.png",
        "auto",
        "530"
    )}
    </div>
    </body>
</html>`;
}

function getImage(src: string, width = "auto", height = "225") {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}
