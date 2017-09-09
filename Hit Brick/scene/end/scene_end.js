class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('U+0052', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillStyle = "black"
        this.game.context.fillText('游戏结束，按 r 返回标题界面', 120, 140)
    }
}
