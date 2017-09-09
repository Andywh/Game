class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
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
        this.bird = b
        b.start = false
        this.addElement(b)
        // 开始提示
        this.hint = GuaImage.new(game, 'demo')
        this.hint.x = 160
        this.hint.y = 280
        this.addElement(this.hint)

        this.title = GuaImage.new(game, 'title')
        this.title.x = 80
        this.title.y = 200
        this.addElement(this.title)


        this.setupInputs()
        //
        this.alpha = 1

        // 切换场景
        game.registerAction('Up', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })

    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    update() {
        super.update()

        if (this.alpha > 0) {
            this.alpha -= 0.05
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
    draw() {
        super.draw()
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
            b.jump()
        })
    }
}
