var Scene = function(game) {
    var s = {
        game: game,

    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0

    blocks = loadLevel(game, 1)

    game.registerAction('Left', function(){
        paddle.moveLeft()
    })
    game.registerAction('Right', function(){
        paddle.moveRight()
    })
    game.registerAction('U+0046', function(){
        ball.fire()
    })

    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }
        game.context.fillStyle = "yellow"
        game.context.fillText('分数: ' + score, 10, 290)
    }
    s.update = function() {
        if (window.paused) {
            return
        }
        // update x
        ball.move()
        if (ball.y > paddle.y) {
            // 跳转到 游戏结束 的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            ball.反弹()
        }
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.collide(ball)) {
                b.kill()
                ball.反弹()
                score += 100
            }
            game.drawImage(b)
        }
    }

    // mouse event
    var enableDrag = false
    var edit = false
    game.canvas.addEventListener("mousedown", function(event){
        var x = event.offsetX
        var y = event.offsetY
        log(x, y)
        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            enableDrag = true
        }
        // 编辑关卡
        edit = true
        var p = [parseInt(x / 50) * 50, parseInt(y / 20) * 20]
        var b = Block(game, p)
        if (!isInBlocks(blocks, b)) {
            blocks.push(b)
        }
    })
    game.canvas.addEventListener("mousemove", function(event){
        var x = event.offsetX
        var y = event.offsetY
        // log(enableDrag)
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
        if (edit) {
            var p = [parseInt(x / 50) * 50, parseInt(y / 20) * 20]
            var b = Block(game, p)
            log('isInArray', isInBlocks(blocks, b))
            log(b, blocks)
            if (!isInBlocks(blocks, b)) {
                blocks.push(b)
            }
        }
    })
    game.canvas.addEventListener("mouseup", function(event){
        var x = event.offsetX
        var y = event.offsetY
        // log(event)
        enableDrag = false
        edit = false
    })
    return s
}
