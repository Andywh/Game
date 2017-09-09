class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
        this.bullets = []
        this.alive = true
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game, 'bullet')

            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }
    moveX(x) {
        this.x += x
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x > 400 - this.texture.width) {
            this.x = 400 - this.texture.width
        }
    }
    moveY(y) {
        this.y += y
        if (this.y < 0) {
            this.y = 0
        }
        if (this.y > 600 - this.texture.height) {
            this.y = 600 - this.texture.height
        }
    }
    moveLeft() {
        this.moveX(-this.speed)
    }
    moveRight() {
        this.moveX(this.speed)
    }
    moveUp() {
        this.moveY(-this.speed)
    }
    moveDown() {
        this.moveY(this.speed)
    }
    collide(bullet) {
        var b = bullet
        return !(b.x + b.w < this.x || b.x > this.x + this.w || b.y + b.h < this.y || b.y > this.y + this.h)
    }
    kill() {
        this.alive = false
        this.scene.removeElement(this)

        var x = this.x + this.w / 2
        var y = this.y + this.h / 2

        var ps = GuaParticleSystem.new(this.game, x, y)
        this.scene.addElement(ps)
    }
}
