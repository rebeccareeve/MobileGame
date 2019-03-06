class SpriteScene extends Phaser.Scene {
  constructor(id) {
    super(id)
    this.id = id;
  }
  preload() {
    this.load.spritesheet("player", 'assets/SpriteSheetIdle.png', {
      frameWidth: 21,
      frameHeight: 50,
    });
    this.load.spritesheet("walk", "assets/SpriteSheetWalk.png", {
      frameWidth: 23,
      frameHeight: 50
    });
    this.load.spritesheet("switch", "assets/SpriteSheetAction.png", {
      frameWidth: 34,
      frameHeight: 50
    });
  }

  create() {
    this.matter.world.setBounds(0, 0, 3408, 1984);
    this.player = new Player(this, 140, 1984);
    this.createAnimations()
    // //cat 0x0016
    // //mask 0x0064

    var mouseSpring = this.matter.add.mouseSpring();

    mouseSpring.constraint.collisionFilter.category = 0x0064 //TODO Write up about it (catagories and masks)
    mouseSpring.constraint.collisionFilter.mask = 0x0016 //TODO Write up about it (catagories and masks)

    var leftWall = this.matter.add.rectangle(1120, 985, 32, 1870, {
      isStatic: true,
    });
    var rightWall = this.matter.add.rectangle(3200, 1015, 32, 1933, {
      isStatic: true,
    });

    for (var i = 0; i < 10; i++) {
      this.floor(2160, (1816 - 176 * i), 2050, 16)
    };

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.cameras.main.setBounds(0, 0, 3408, 1984);
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
    this.cameras.main.zoom = 12; //12
  }

  floor(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  update() {
    this.checkPlayerMovement();

    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      switch (this.id) {
        case 'LightScene':
          this.scene.switch('DarkScene');
          break;
        case 'DarkScene':
          this.scene.switch('LightScene');
          break;
      }
    }
  }

  checkPlayerMovement() {
    if (!this.switchAnimationRunning) {
      if (this.keyD.isDown) {
        this.player.sprite.setVelocityX(3);
        this.player.sprite.flipX = false;
        this.player.sprite.anims.play("characterWalk", true);
      } else if (this.keyA.isDown) {
        this.player.sprite.setVelocityX(-3);
        this.player.sprite.flipX = true;
        this.player.sprite.anims.play("characterWalk", true);
      } else {
        if (!this.keyL.isDown) {
          this.player.sprite.anims.play("characterIdle", true);
        }
      }
      if (this.keyW.isDown) {
        this.player.sprite.setVelocityY(-2);
      } else {
        this.player.sprite.setVelocityY(0);
      }
    }
    if (this.keyL.isDown) {
      this.player.sprite.setVelocityX(0);
      this.switchAnimationRunning = true;
      this.player.sprite.on('animationcomplete', this.animComplete, this);
      this.player.sprite.anims.play("characterSwitch", true);
    }
  }

  animComplete() {
    this.switchAnimationRunning = false;
  }

  createAnimations() {
    this.anims.create({
      key: "characterIdle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 4
      }),
      repeat: -1,
      frameRate: 15
    });

    this.anims.create({
      key: "characterWalk",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 0,
        end: 5
      }),
      repeat: -1,
      frameRate: 15
    });

    this.anims.create({
      key: "characterSwitch",
      frames: this.anims.generateFrameNumbers("switch", {
        start: 0,
        end: 8
      }),
      repeat: 0,
      frameRate: 10
    });
  }

}
