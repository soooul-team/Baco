/**
 * 随机字符串16位
 */
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c',
    'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z'
];

export default class Generator {

    static viewIdGenerate() {
        let num = Math.floor(Math.random() * 89999 + 10000);
        console.log("viewIdGenerate:" + `${Date.now()}${num}`);
        return `${Date.now()}${num}`;
    }

    static verificationCodeGenerate() {
        let num = Math.floor(Math.random() * 899999 + 100000);
        return `${num}`;
    }

    static createTokenStr() {
        let strs = "";
        for (let i = 0; i < 16; i++) {
            let id = parseInt(String(Math.random() * 61));
            strs += chars[id];
        }
        return strs;
    }

    static createAccessCodeStr() {
        let strs = "";
        for (let i = 0; i < 32; i++) {
            let id = parseInt(String(Math.random() * 61));
            strs += chars[id];
        }
        return strs;
    }
}
