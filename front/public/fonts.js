import { Global } from "@emotion/react"
const Fonts = () => (
    <Global
        styles={`
              @font-face {
                    font-family: 'NanumBarunGothic';
                    src: local('NanumBarunGothic'),
                    local('NanumBarunGothic'),
                    url('./fonts/NanumBarunGothic.eot') format('embedded-opentype'), /* IE 호환성 */
                    url('./fonts/NanumBarunGothic.woff') format('woff'), /* 모던 브라우저(IE9+, Chrome, Safari 등) */
                    url('./fonts/NanumBarunGothic.ttf') format('truetype');
                    font-style: normal;
                    font-weight: normal;
                    unicode-range: U+0-10FFFF;
              }

               @font-face {
                    font-family: 'NanumBarunGothic';
                    src: local('NanumBarunGothicBold'),
                    local('NanumBarunGothicBold'),
                    url('./fonts/NanumBarunGothicBold.eot') format('embedded-opentype'),
                    url('./fonts/NanumBarunGothicBold.woff') format('woff'),
                    url('./fonts/NanumBarunGothicBold.ttf') format('truetype');
                    font-style: normal;
                    font-weight: bold;
                    unicode-range: U+0-10FFFF;
               }
       `}
    />
)
export default Fonts