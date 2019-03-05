class Buttons{

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
    this.load.spritesheet('switchButton', 'assets/switch.png',   {
      frameWidth: 80,
      frameHeight: 80,
    });
  }

  create() {
    this.add.sprite(5, 1955, 'leftButton', null).setOrigin(0, 0).setScale(0.3).setDepth(6);
    this.add.sprite(60, 1955, 'rightButton', null).setOrigin(0, 0).setScale(0.3).setDepth(6);
    this.add.sprite(255, 1955, 'upButton', null).setOrigin(0, 0).setScale(0.3).setDepth(6);
    this.add.sprite(255, 1820, 'switchButton', null).setOrigin(0, 0).setScale(0.3).setDepth(6);
  }

  update() {

  }
}
