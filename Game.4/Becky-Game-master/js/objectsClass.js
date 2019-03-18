class cupboardStack {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "cupboardStack", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setFixedRotation()
      .setPosition(x, y)
      .setStatic(true)
  }
}

class stairs {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "stairs", 0)
      .setDepth(4)
      .setBody()
      .setScale(0.7)
      .setFixedRotation()
      .setPosition(x, y)
      .setStatic(true)
      .setVisible(false)
  }
}

class stairsx2 {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "stairsx2", 0)
      .setDepth(4)
      .setBody()
      .setScale(0.7)
      .setFixedRotation()
      .setPosition(x, y)
      .setStatic(true)
      .setVisible(false)
  }
}

class platform {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "platform", 0)
    .setDepth(4)
    .setBody()
    .setScale(1)
    .setFixedRotation()
    .setPosition(x, y)
    .setStatic(true)
    .setVisible(false)
  }
}

class barrier {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "barrier", 0)
    .setDepth(4)
    .setBody()
    .setScale(1.25)
    .setFixedRotation()
    .setPosition(x, y)
    .setStatic(true)
  }
}

class keyCard {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "keyCardSprite", 0)
    .setDepth(4)
    .setBody()
    .setScale(0.1)
    .setFixedRotation()
    .setPosition(x, y)
    .setStatic(true)
	.setSensor(false)
  }
}

class locker {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "locker", 0)
    .setDepth(4)
    .setBody()
    .setScale(1)
    .setFixedRotation()
    .setPosition(x, y)
    .setVisible(false)
    .setStatic(true)
  }
}

class desk {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "desk", 0)
    .setDepth(4)
    .setBody()
    .setScale(1)
    .setFixedRotation()
    .setPosition(x, y)
    .setVisible(false)
    .setStatic(true)
  }
}

class chair {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "chair1", 0)
    .setDepth(4)
    .setBody()
    .setScale(1)
    .setFixedRotation()
    .setPosition(x, y)
    .setVisible(false)
    .setStatic(true)

  }
}


class lift {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "barrier", 0)
    .setDepth(4)
    .setBody()
    .setScale(0.6)
    .setFixedRotation()
    .setPosition(x, y)
    .setVisible(false)
    .setStatic(true)
  }
}

class portal {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
    .sprite(0, 0, "portal", 0)
    .setDepth(4)
    .setBody()
    .setScale(0.5)
    .setFixedRotation()
    .setPosition(x, y)
    .setVisible(true)
    .setStatic(true)
    .setSensor(true)
  }
}

  class text {
    constructor (scene, x, y) {
      this.scene = scene;
      this.sprite = scene.matter.add
      .sprite(0, 0, "endText", 0)
      .setDepth(11)
      .setBody()
      .setScale(1)
      .setFixedRotation()
      .setPosition(x, y)
      .setVisible(false)
      .setStatic(true)
      .setSensor(true)
    }
}
