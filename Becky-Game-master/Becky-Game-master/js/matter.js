class SpriteScene extends Phaser.Scene {
  constructor() {
    super('SpriteScene')
    this.id = 'SpriteScene';
    this.switchAnimationRunning = false;
  }
  preload() {

    this.load.image('light', 'assets/light.png');
    this.load.image('chair1', 'assets/chair1.png');
    this.load.image('chair2', 'assets/chair2.png');
    this.load.image('printer', 'assets/printer.png');
    this.load.image('cupboard', 'assets/cupboard.png');
    this.load.image('desk', 'assets/desk.png');

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

    this.load.spritesheet("keyCard", "../assets/keyCardSpriteSheetNB.png", {
      frameWidth: 23,
      frameHeight: 160
    });
  }

  create() {
    this.matter.world.setBounds(0, 0, 3408, 1984);
    this.player = new Player(this, 140, 1984);
    this.createAnimations()
    this.createLights()
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

    var firstFloor = this.matter.add.rectangle(2130, 1816, 1980, 16, {
      isStatic: true,
    });

    for (var i = 0; i < 10; i++) {
      this.floor(2160, (1640 - 176 * i), 2050, 16)
    };

    var cupboardStack = this.matter.add.rectangle(1920, 1760, 34, 95, {
      isStatic: true,
    });


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

  }

  checkPlayerMovement() {

    if (this.player.movement.switch && this.switchAnimationRunning == false) {
      this.switchAnimationRunning = true;
      console.log('switch animation activated');
      //this.switchAnimationRunning = false;
      //this.player.sprite.on('animationcomplete', this.switchAnimComplete, this)
      this.player.sprite.play("characterSwitch", true);
    }

    if (!this.switchAnimationRunning) {
      if (this.player.movement.left) {
        this.player.sprite.setVelocityX(-3);
        this.player.sprite.flipX = true;
        this.player.sprite.anims.play("characterWalk", true);
      } else if (this.player.movement.right) {
        this.player.sprite.setVelocityX(3);
        this.player.sprite.flipX = false;
        this.player.sprite.anims.play("characterWalk", true);
      } else {
        this.player.sprite.setVelocityX(0)
        if (!this.switchAnimationRunning)
          this.player.sprite.anims.play("characterIdle", true);
      }
    }
    if (!this.switchAnimationRunning) {
      if (this.player.movement.jump) {
        this.player.sprite.setVelocityY(-2);
      } else {
        this.player.sprite.setVelocityY(0)
      }
    }

  }

  switchAnimComplete(animation, frame) {
    console.log("WE DID THE ANIMATE: " + this.switchAnimationRunning);
    this.switchAnimationRunning = false;
    /*if (this.scene.isVisible('DarkScene')) {
      this.scene.get('LightScene').scene.setVisible(true);
      this.scene.get('DarkScene').scene.setVisible(false);
    } else {
      this.scene.get('LightScene').scene.setVisible(false);
      this.scene.get('DarkScene').scene.setVisible(true);
    }*/
    this.player.movement.switch = false;
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

  createLights() {
    var lightA = this.matter.add.image(2175, 1530, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightA, 50, 0.1, {
      pointA: {
        x: 2150,
        y: 1500
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightA, 50, 0.1, {
      pointA: {
        x: 2200,
        y: 1500
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightB = this.matter.add.image(2275, 1530, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightB, 50, 0.1, {
      pointA: {
        x: 2250,
        y: 1500
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightB, 50, 0.1, {
      pointA: {
        x: 2300,
        y: 1500
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightC = this.matter.add.image(2375, 1530, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightC, 50, 0.1, {
      pointA: {
        x: 2350,
        y: 1500
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightC, 50, 0.1, {
      pointA: {
        x: 2400,
        y: 1500
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightD = this.matter.add.image(2475, 1530, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightD, 50, 0.1, {
      pointA: {
        x: 2450,
        y: 1500
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightD, 50, 0.1, {
      pointA: {
        x: 2500,
        y: 1500
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightE = this.matter.add.image(2575, 1530, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightE, 50, 0.1, {
      pointA: {
        x: 2550,
        y: 1500
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightE, 50, 0.1, {
      pointA: {
        x: 2600,
        y: 1500
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightF = this.matter.add.image(2675, 1530, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightF, 50, 0.1, {
      pointA: {
        x: 2650,
        y: 1500
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightF, 50, 0.1, {
      pointA: {
        x: 2700,
        y: 1500
      },
      pointB: {
        x: 20,
        y: 0
      }
    });
  }

}
