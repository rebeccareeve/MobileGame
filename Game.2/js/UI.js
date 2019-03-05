class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }
  preload() {
    this.load.spritesheet('leftButton', 'assets/left.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('rightButton', 'assets/right.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('upButton', 'assets/up.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('switchButton', 'assets/switch.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
  }
  create() {
    this.buttons = {
      left: new Button(this, 20, 1820, 'leftButton'),
      right: new Button(this, 250, 1820, 'rightButton'),
      jump: new Button(this, 3230, 1820, 'upButton'),
      switch: new Button(this, 3230, 20, 'switchButton'),
    }
    console.log(this.buttons);
    this.scene.launch('UIScene');
  }
}
