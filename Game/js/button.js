class Button {
  constructor(scene, x, y, texture) {
    this.scene = scene;
    this.sprite = this.scene.matter.add
      .sprite(x, y, texture, null)
      .setOrigin(0, 0)
      .setScale(2)
      .setDepth(6)
      .setStatic(true)
      .setScrollFactor(0)
  }

}
