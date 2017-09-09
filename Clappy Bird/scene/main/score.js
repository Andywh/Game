class Score {
    constructor(game) {
        this.game = game
        this.numbers = []
        this.scores = [0, 0]
        for (var i = 0; i < 10; i++) {
            var name = `s${i}`
            var t = game.textureByName(name)
            this.w = t.width
            this.h = t.height
            this.numbers.push(t)
        }
        this.x = 180
        this.y = 100
    }
    static new(game) {
        return new this(game)
    }
    add() {
        this.scores[0]++
        if (this.scores[0] > this.scores[1]) {
            this.scores[1] = this.scores[0]
        }
    }
    update() {

    }
    draw(r) {
        var context = this.game.context
        var n = this.numbers
        var s = this.scores[0]
        if (s < 10) {
            context.drawImage(n[s], this.x, this.y)
        } else if (s >= 10 && s < 100) {
            context.drawImage(n[parseInt(s / 10)], this.x - this.w / 2 - 3, this.y)
            context.drawImage(n[s % 10], this.x + this.w / 2 + 3, this.y)
        } else if (s >= 100 && s < 1000) {
            context.drawImage(n[parseInt(s / 100)], this.x - this.w - 3, this.y)
            context.drawImage(n[parseInt((s % 100) / 10)], this.x, this.y)
            context.drawImage(n[s % 10], this.x + this.w + 3, this.y)
        }
    }
}
