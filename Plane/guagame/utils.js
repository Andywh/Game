var log = console.log.bind(console)
// var e = sel => document.querySelector(sel)
//
// var log = function(s) {
//     e('#id-input-log').value += '\n' + s
// }

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
