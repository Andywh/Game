class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('U+004B', function(){
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillStyle = "black"
        this.game.context.fillText('按 k 开始游戏', 100, 100)
        this.game.context.fillText('开始后 fire 前可编辑关卡', 100, 120)
        this.game.context.fillText('开始后按 f 发射弹球', 100, 140)
        this.game.context.fillText('开始后按 Left 左移', 100, 160)
        this.game.context.fillText('开始后按 Right 右移', 100, 180)
    }
}
