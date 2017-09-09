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

var isInBlocks = function(blocks, value) {
    for (var b of blocks) {
        if (b.x === value.x && b.y === value.y) {
            return true
        }
    }
    return false
}
