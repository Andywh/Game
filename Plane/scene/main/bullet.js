class Bullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        this.y -= this.speed
    }
    removeBullet() {
        this.scene.removeElement(this)
        var bullets = this.scene.player.bullets
        for (var i = 0; i < bullets.length; i++) {
            var b = bullets[i]
            if (b === this) {
                bullets.splice(i, 1)
            }
        }
    }
}
