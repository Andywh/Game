class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columsOfPipe = 4
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 700 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-450, -150)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    最右边管子的横坐标() {
        var d = 0
        for (var p of this.pipes) {
            if (p.x > d) {
                d = p.x
            }
        }
        return d
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }
    update() {
        for (var i = 0; i < this.pipes.length / 2; i++) {
            var p1 = this.pipes[i*2]
            var p2 = this.pipes[i*2+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x = this.最右边管子的横坐标() + this.管子横向间距
            }
            if (p2.x < -100) {
                p2.x = this.最右边管子的横坐标()
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
    collide(bird) {
        var b = false
        for (var p of this.pipes) {
            b = b || !(bird.x > p.x + p.w || bird.x + bird.w < p.x || bird.y > p.y + p.h || bird.y + bird.h < p.y)
        }
        return b
    }
    underPipe(bird) {
        var b = false
        for (var p of this.pipes) {
            b = b || !(bird.x + bird.w < p.x || bird.x > p.x + p.w)
        }
        return b
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // bird bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 1; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 10
            g.y = 530
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        this.birdSpeed = 2
        var b = GuaAnimaton.new(game)
        b.x = 100
        b.y = 280
        b.start = true
        this.bird = b
        this.addElement(b)
        // 分数
        this.score = Score.new(game)
        this.addElement(this.score)
        this.underPipe = false
        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        // 判断小鸟和管子是否碰撞
        if (this.pipe.collide(this.bird) || this.bird.y + this.bird.h >= 530) {
            this.removeElement(this.score)
            hitAudio()
            var end = SceneEnd.new(this.game, this.bird, this.score, this.elements)
            this.game.replaceScene(end)
        }
        super.update()
        // 更新分数
        if (this.pipe.underPipe(this.bird)) {
            this.underPipe = true
        }
        if (!this.pipe.underPipe(this.bird) && this.underPipe == true) {
            this.underPipe = false
            scoreAudio()
            this.score.add()
        }
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 1; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('Left', function(keyStatus){
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('Right', function(keyStatus){
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('Up', function(keyStatus){
            flapAudio()
            b.jump()
        })
    }
}
