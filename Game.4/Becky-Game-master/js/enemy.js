class enemy {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "slime", 0)
      .setDepth(5)
      .setBody()
      .setScale(0.5)
      .setFixedRotation()
      .setPosition(x, y);
  }
}
