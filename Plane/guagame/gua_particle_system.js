class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        log(x, y)
        this.setup()
    }
    static new(game, x, y) {
        return new this(game, x, y)
    }
    setup() {
        this.duration = 10
        this.numberOfParticles = 100
        this.particles = []
    }
    update() {
        this.duration--
        // 添加小火花
        if (this.duration > 0 && this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化坐标
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            this.particles = []
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}
