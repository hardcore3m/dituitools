function ColorDifference(color, wheelColor) {

    let difference = Math.sqrt(Math.pow(color.red - wheelColor.red, 2) + Math.pow(color.green - wheelColor.green, 2) + Math.pow(color.blue - wheelColor.blue, 2))
    return difference
}

module.exports = ColorDifference;