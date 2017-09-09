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
        cave: 'img/cave.png',
        // flappy bird images
        bg: 'bird/background.png',
        ground: 'bird/ground.png',
        b1: 'bird/b1.png',
        b2: 'bird/b2.png',
        b3: 'bird/b3.png',
        pipe: 'bird/pipeUp.png',
        // pipe: 'bird/pipe.png',
        //
        demo: 'bird/demo.png',
        title: 'bird/title.png',

        s0: 'bird/0.png',
        s1: 'bird/1.png',
        s2: 'bird/2.png',
        s3: 'bird/3.png',
        s4: 'bird/4.png',
        s5: 'bird/5.png',
        s6: 'bird/6.png',
        s7: 'bird/7.png',
        s8: 'bird/8.png',
        s9: 'bird/9.png',

        black: 'bird/black.png',
        gameOver: 'bird/gameOver.png',
        scoreScreen: 'bird/scoreScreen.png',

        m1: 'bird/bronzeMedal.png',
        m2: 'bird/silverMedal.png',
        m3: 'bird/goldMedal.png',
        m4: 'bird/platMedal.png',

        start: 'bird/start.png',
        share: 'bird/share.png',

    }

    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(game)
        var s = SceneTitle.new(game)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

__main()
