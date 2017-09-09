var Block = function(game, position) {
    // log(position)
    var p = position
    // var image = imageFromPath('block.png')
    var o = game.imageByName('block')

    // var o = {
    // image: image,
    o.x = p[0],
    o.y = p[1],
    o.alive = true,
    o.lifes = p[2] || 1,
    // }
    o.collide = function(ball){
        return o.alive && !(ball.x + ball.image.width < o.x || ball.x > o.x + o.image.width || ball.y + ball.image.height < o.y || ball.y > o.y + o.image.height)
    }
    o.kill = function() {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    return o
}
