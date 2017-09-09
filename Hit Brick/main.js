var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.keyIdentifier
        if (k == 'U+0050') {
            window.paused = !window.paused
        } else if (k == 'U+0031') {
            blocks = loadLevel(game, 1)
        } else if (k == 'U+0032') {
            blocks = loadLevel(game, 2)
        } else if (k == 'U+0033') {
            blocks = loadLevel(game, 3)
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(){
        var input = event.target
        log(input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
        block: 'img/block.png',
    }

    var game = GuaGame.instance(30, images, function(g){
        var s = SceneTitle.new(game)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

__main()
