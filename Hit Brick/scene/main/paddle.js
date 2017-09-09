var Paddle = function(game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 5,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15
    o.move  = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    o.collide = function(ball){
        return !(ball.x + ball.image.width < o.x || ball.x > o.x + o.image.width || ball.y + ball.image.height < o.y || ball.y > o.y + o.image.height)
    }
    return o
}
