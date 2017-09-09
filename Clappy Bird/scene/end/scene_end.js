class SceneEnd extends GuaScene {
    constructor(game, bird, score, elements) {
        super(game, bird, score, elements)
        this.elements = elements
        this.game = game
        this.bird = bird
        this.score = score
        // 切换场景
        game.registerAction('U+0052', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        this.bird.jump = function() {
        }
        // 相对偏移量
        this.offset = {
            scoreScreenToGameX: 20,
            scoreScreenToGameY: 50,
            scoreX: 191,
            scoreY: 38,
            medalX: 25,
            medalY: 45,
            startX: 20,
            startY: 130,
            shareX: 120,
            shareY: 130,
        }
        // 添加 GameOver
        var gv = GuaImage.new(game, 'gameOver')
        gv.x = 105
        gv.y = 100
        this.gameOver = gv
        this.addElement(gv)
        // 添加 scoreScreen
        var ss = GuaImage.new(game, 'scoreScreen')
        ss.x = gv.x - this.offset.scoreScreenToGameX
        ss.y = gv.y + this.offset.scoreScreenToGameY
        this.scoreScreen = ss
        this.addElement(ss)
        // 分数坐标
        this.score.x = ss.x + this.offset.scoreX
        this.score.y = ss.y + this.offset.scoreY
        this.alpha = 0
        // 添加 medal
        this.medals = []
        for (var i = 1; i < 5; i++) {
            var name = `m${i}`
            // var t = game.textureByName(name)
            var m = GuaImage.new(game, name)
            m.x = ss.x + this.offset.medalX
            m.y = ss.y + this.offset.medalY
            this.medals.push(m)
        }
        // restart 和 share
        var start = GuaImage.new(game, 'start')
        start.x = ss.x + this.offset.startX
        start.y = ss.y + this.offset.startY
        this.start = start
        this.addElement(start)

        var share = GuaImage.new(game, 'share')
        share.x = ss.x + this.offset.shareX
        share.y = ss.y + this.offset.shareY
        this.share = share
        this.addElement(share)

        var restart = false
        var self = this
        game.canvas.addEventListener('mousedown', function(event) {
            var x = event.layerX
            var y = event.layerY
            // 检查是否点中了 start
            if (self.hasPoint(self.start, x, y)) {
                // 设置 restart
                restart = true
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            var x = event.layerX
            var y = event.layerY
            if (restart) {
                var s = SceneTitle.new(game)
                self.game.replaceScene(s)
            }
        })
    }
    static new(game, bird, score, elements) {
        var i = new this(game, bird, score, elements)
        return i
    }
    hasPoint(start, x, y) {
        var xIn = (x >= start.x && x <= start.x + start.w)
        var yIn = (y >= start.y && y <= start.y + start.h)
        return xIn && yIn
    }
    update() {
        // 更新 alpha
        if (this.alpha < 1) {
            this.alpha += 0.2
        }

        var b = this.bird
        b.y += b.vy
        b.vy += b.gy * 0.2
        var h = 500
        if (b.y > h) {
            b.y = h
        }
        // 更新角度
        if (b.rotation < 45) {
            b.rotation += 5
        }
        // gameOver
        this.gameOver.y += 5
        var h = 150
        if (this.gameOver.y > h) {
            this.gameOver.y = h
        }
        // scoreScreen
        this.scoreScreen.y = this.gameOver.y + this.offset.scoreScreenToGameY
        // 分数
        this.score.y = this.scoreScreen.y + this.offset.scoreY
        // medal
        for (var m of this.medals) {
            m.y = this.scoreScreen.y + this.offset.medalY
        }
        // 更新 start 和 share 的 y 坐标
        this.start.y = this.scoreScreen.y + this.offset.startY
        this.share.y = this.scoreScreen.y + this.offset.shareY
    }
    draw() {
        super.draw()
        // 渐变效果
        var context = this.game.context
        var alpha = context.globalAlpha
        context.globalAlpha = this.alpha
        // score
        var ratio = 3.5
        var x = this.score.x
        var y = this.score.y
        var n = this.score.numbers
        var w = 10
        var h = 14.3
        for (var i = 0; i < 2; i++) {
            var s = this.score.scores[i]
            y = y + 45 * i
            if (s < 10) {
                context.drawImage(n[s], x, y, w, h)
            } else if (s >= 10 && s < 100) {
                context.drawImage(n[parseInt(s / 10)], x - w - 1, y, w, h)
                context.drawImage(n[s % 10], x, y, w, h)
            } else if (s >= 100 && s < 1000) {
                context.drawImage(n[parseInt(s / 100)], x - 2 * w - 2, y, w, h)
                context.drawImage(n[parseInt((s % 100) / 10)], x  - w - 1, y, w, h)
                context.drawImage(n[s % 10], x, y, w, h)
            }
        }
        // medals
        var m = this.medals
        var s = this.score.scores[0]
        var i = 0
        while (s >= 10) {
            s = parseInt(s / 10)
            i++
        }
        this.game.drawImage(m[i], s.x, s.y)
    }
}
