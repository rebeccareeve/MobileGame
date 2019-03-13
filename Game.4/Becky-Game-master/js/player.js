class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "player", 0)
      .setDepth(5)
      .setBody()
      .setScale(1)
      .setFixedRotation()
      .setPosition(x, y)
      .setBounce(0.01)
      .setMass(0.5)
      .setFriction(0.01);
    this.movement = {
      left: false,
      right: false,
      up: false,
      switch: false
    }
  }
switch() {
  this.movement.switch = !this.movement.switch
}
  update() {

  }
}
