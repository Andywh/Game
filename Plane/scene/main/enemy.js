class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.bullets = []
        this.numberOfBullets = 90
        this.cooldown = 1
    }
    update() {
        this.cooldown--
        if (this.cooldown == 0) {
            this.cooldown = 90
            this.fire()
        }
        if (this.y > 600) {
            this.setup()
        }
        this.y += this.speed
    }
    collide(bullet) {
        var b = bullet
        return !(b.x + b.w < this.x || b.x > this.x + this.w || b.y + b.h < this.y || b.y > this.y + this.h)
    }
    fire() {
        var b = Bullet.new(this.game, 'enemy_bullet')
        var x = this.x + this.w / 2 - b.texture.width / 2
        var y = this.y + this.h
        b.x = x
        b.y = y
        b.speed = -6
        log('here', this)
        // return
        this.scene.addElement(b)
        this.scene.enemy_bullets.push(b)
    }
    kill() {
        var x = this.x + this.w / 2
        var y = this.y + this.h / 2

        var ps = GuaParticleSystem.new(this.game, x, y)
        this.scene.addElement(ps)
        this.setup()
    }
}
