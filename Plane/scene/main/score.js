class Score extends GuaLabel {
    constructor(game) {
        super(game, '分数')
        this.score = 0
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.font="20px Georgia"
        this.game.context.fillText('分数: ' + this.score, 10, 580)
    }
    add() {
        this.score += 100
    }
}
