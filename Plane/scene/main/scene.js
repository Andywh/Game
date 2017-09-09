class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 5
        this.score = 0
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game, 'cloud')
        this.score = Score.new(game)

        this.player = Player.new(game)
        this.player.x = 20
        this.player.y = 300

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addElement(this.score)
        //
        this.addEnemies()
        this.enemy_bullets = []

        // 分数

    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    removePlayer() {
        this.removeElement(this.player)
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('Left', function(){
            s.player.moveLeft()
        })
        g.registerAction('Right', function(){
            s.player.moveRight()
        })
        g.registerAction('Up', function(){
            s.player.moveUp()
        })
        g.registerAction('Down', function(){
            s.player.moveDown()
        })
        g.registerAction('U+0046', function(){
            s.player.fire()
        })
    }
    update() {
        super.update()
        // this.cloud.y += 1
        // 我方子弹与 敌机 碰撞
        for (var e of this.enemies) {
            for (var b of this.player.bullets) {
                if (e.collide(b)) {
                    b.removeBullet(b)
                    e.kill()
                    e.setup()
                    this.score.add()
                }
            }
        }
        // 敌方子弹与 player 碰撞
        for (var b of this.enemy_bullets) {
            if (this.player.alive && this.player.collide(b)) {
                b.removeBullet(b)
                this.player.kill()
            }
        }
        // 敌机与 player 碰撞
        for (var e of this.enemies) {
            if (this.player.alive && this.player.collide(e)) {
                e.kill()
                e.setup()
                this.player.kill()
            }
        }
    }
}
