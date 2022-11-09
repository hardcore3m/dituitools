class Color {
    constructor(hex) {
        if (hex.length != 7) {
            throw "Only hash plus six-digit hex colors are allowed.";
        }
        this.hex = hex;
        let hexNumber = hex.replace('#', '');
        let aRgbHex = hexNumber.match(/.{1,2}/g);

        this.red = parseInt(aRgbHex[0], 16);
        this.green = parseInt(aRgbHex[1], 16);
        this.blue = parseInt(aRgbHex[2], 16);


    }
}

module.exports = Color;