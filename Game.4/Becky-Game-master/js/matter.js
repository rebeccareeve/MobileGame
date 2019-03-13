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
    this.load.image('stairs', 'assets/stairs.png');
    this.load.image('stairsx2', 'assets/stairsx2.png');
    this.load.image('desk', 'assets/desk.png');
    this.load.image('locker', 'assets/locker.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('barrier', 'assets/barrier.png');

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

    this.load.spritesheet("keyCardSprite", "../assets/keyCardSpriteSheetNB.png", {
      frameWidth: 160,
      frameHeight: 160
    });

    this.load.spritesheet("cupboardStack", "../assets/cupboardStack.png", {
      frameWidth: 23,
      frameHeight: 160
    });

    this.load.spritesheet("slime", "assets/Slime.png", {
      frameWidth: 64,
      frameHeight: 42
    });
  }

  create() {
    this.matter.world.setBounds(0, 0, 2272, 1265);
    this.player = new Player(this, 20, 1240); //(this, 20, 1240); //300, 900
    this.createAnimations()
    this.createLights()
    // //cat 0x0016
    // //mask 0x0064

    var mouseSpring = this.matter.add.mouseSpring();

    mouseSpring.constraint.collisionFilter.category = 0x0064 //TODO Write up about it (catagories and masks)
    mouseSpring.constraint.collisionFilter.mask = 0x0016 //TODO Write up about it (catagories and masks)

    this.leftWall = this.matter.add.rectangle(195, 880, 30, 640, {
      isStatic: true,
    });
    this.rightWall = this.matter.add.rectangle(2265, 910, 15, 705, {
      isStatic: true,
    });

    this.firstFloor = this.matter.add.rectangle(1193, 1095, 1965, 16, {
      isStatic: true,
    });

    for (var i = 0; i < 3; i++) {
      this.floor(1230, (920 - 175 * i), 2050, 16)
    };


    // MATTER OBJECTS FOR SCENES
    this.cupboardStackSecondFloor = new cupboardStack(this, 993, 1040);
    this.stairsThirdFloorLightScene1 = new stairs(this, 1135, 895);
    this.stairsThirdFloorLightScene2 = new stairs(this, 1225, 895);
    this.stairsx2ThirdFloorLightScene = new stairsx2(this, 1180, 880);
    this.stairsThirdFloorDarkScene = new stairs(this, 0, 0); //1895, 895
    this.stairsx2ThirdFloorDarkScene = new stairsx2(this, 0, 0); // 1850, 880
    this.platform1 = new platform(this, 0, 0); // 2035, 1240
    this.platform2 = new platform(this, 0, 0); // 2095, 1207
    this.platform3 = new platform(this, 0, 0); // 2160, 1178
    this.platform4 = new platform(this, 0, 0); // 2222, 1146
    this.barrierFirstFloorLightScene = new barrier(this, 2200, 1185);
    this.barrierSecondFloorDarkScene = new barrier(this, 970, 1010);
    this.barrierThirdFloorDarkScene = new barrier(this, 1190, 835);
    this.barrierThirdFloorLightScene = new barrier(this, 1800, 835);
    this.locker = new locker(this, 0, 0); //1850, 720

    //PICKUP OBJECTS
    this.keyCardSecondFloor = new keyCard(this, 770, 1050);
    this.keyCardThirdFloor = new keyCard(this, 1175, 838);
    this.keyCardFourthFloor = new keyCard(this, 1900, 680);

    // ENEMIES
    this.slime1 = new enemy(this, 0, 0); //2080, 1240
    this.slime2 = new enemy(this, 250, 1080);
    this.slime3 = new enemy(this, 1300, 900);
    this.slime4 = new enemy(this, 1700, 720);



    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.cameras.main.setBounds(0, 0, 2272, 1280);
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
    this.cameras.main.zoom = 7; //7                                                                     CAMERA

    this.player.sprite.on('animationcomplete', this.switchAnimComplete, this);

    //Light Scene

    // for (var i = 0; i < 6; i++) {
    //   this.liftLeft(1150, (1770 - 176 * i), 2, 75)
    // };
    //
    // for (var i = 0; i < 5; i++) {
    //   this.liftRight(3170, (1770 - 176 * i), 2, 75)
    // };

    // Dark Scene

    // this.desk = this.matter.add.image(2250, 1800, 'desk', null, {
    //   shape: 'rectangle',
    //   isStatic: false,
    // }).setDepth(5);

  }

  floor(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  //Light Scene
  liftLeft(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  liftRight(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }


  update() {
    this.checkPlayerMovement();
    this.playObjectAnimations();
    this.enemyPathways();

  }

  checkPlayerMovement() {

    if (this.player.movement.switch && this.switchAnimationRunning == false) {
      this.player.sprite.anims.stop();
      this.switchAnimationRunning = true;
    }

    if (this.switchAnimationRunning) {
      this.player.sprite.play("characterSwitch", true);
    } else {
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
        if (!this.switchAnimationRunning) {}
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
    if (animation.key === "characterSwitch") {
      if (this.scene.isVisible('DarkScene')) {
        this.scene.get('LightScene').scene.setVisible(true);
        this.scene.get('DarkScene').scene.setVisible(false);
        this.lightScene();
      } else {
        this.scene.get('LightScene').scene.setVisible(false);
        this.scene.get('DarkScene').scene.setVisible(true);
        this.darkScene();
      }
      this.switchAnimationRunning = false;
      this.player.movement.switch = false;
    }
  }

  // IF FUNCTIONS FOR OBJECTS IN SCENES

  lightScene() {
    if (this.scene.get('LightScene').scene.isVisible()) {
      this.stairsThirdFloorLightScene1.sprite.setVisible(true).setPosition(1135, 895);
      this.stairsThirdFloorLightScene2.sprite.setVisible(true).setPosition(1225, 895);
      this.stairsx2ThirdFloorLightScene.sprite.setVisible(true).setPosition(1180, 880);
      this.stairsThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.stairsx2ThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.platform1.sprite.setVisible(false).setPosition(0, 0);
      this.platform2.sprite.setVisible(false).setPosition(0, 0);
      this.platform3.sprite.setVisible(false).setPosition(0, 0);
      this.platform4.sprite.setVisible(false).setPosition(0, 0);
      this.barrierFirstFloorLightScene.sprite.setVisible(true).setPosition(2200, 1185);
      this.barrierSecondFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.barrierThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.barrierThirdFloorLightScene.sprite.setVisible(true).setPosition(1800, 835);
      this.keyCardSecondFloor.sprite.setVisible(true).setPosition(770, 1050);
      this.keyCardThirdFloor.sprite.setVisible(true).setPosition(1175, 838);
      this.keyCardFourthFloor.sprite.setVisible(false).setPosition(0, 0);
      this.locker.sprite.setVisible(false).setPosition(0, 0).setStatic(true);
      // this.slime1.sprite.setVisible(false).setPosition(0, 0).setStatic(true);
      this.slime2.sprite.setVisible(true).setPosition(this.slime2.sprite.x, this.slime2.sprite.y);
      this.slime3.sprite.setVisible(true).setPosition(this.slime3.sprite.x, this.slime3.sprite.y);
      this.slime4.sprite.setVisible(true).setPosition(this.slime4.sprite.x, this.slime4.sprite.y);
    }
  }

  darkScene() {
    if (this.scene.get('DarkScene').scene.isVisible()) {
      this.stairsThirdFloorLightScene1.sprite.setVisible(false).setPosition(0, 0);
      this.stairsThirdFloorLightScene2.sprite.setVisible(false).setPosition(0, 0);
      this.stairsx2ThirdFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.stairsThirdFloorDarkScene.sprite.setVisible(true).setPosition(1895, 895);
      this.stairsx2ThirdFloorDarkScene.sprite.setVisible(true).setPosition(1850, 880);
      this.platform1.sprite.setVisible(true).setPosition(2035, 1240);
      this.platform2.sprite.setVisible(true).setPosition(2095, 1207);
      this.platform3.sprite.setVisible(true).setPosition(2160, 1178);
      this.platform4.sprite.setVisible(true).setPosition(2222, 1146);
      this.barrierFirstFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.barrierSecondFloorDarkScene.sprite.setVisible(true).setPosition(970, 1010);
      this.barrierThirdFloorDarkScene.sprite.setVisible(true).setPosition(1190, 835);
      this.barrierThirdFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.keyCardSecondFloor.sprite.setVisible(false).setPosition(0, 0);
      this.keyCardThirdFloor.sprite.setVisible(false).setPosition(0, 0);
      this.keyCardFourthFloor.sprite.setVisible(true).setPosition(1900, 680);
      this.locker.sprite.setVisible(true).setPosition(1850, 720).setStatic(false);
      // this.slime1.sprite.setVisible(true).setPosition(2080, 1255).setStatic(false);
      this.slime2.sprite.setVisible(true).setPosition(this.slime2.sprite.x, this.slime2.sprite.y);
      this.slime3.sprite.setVisible(true).setPosition(this.slime3.sprite.x, this.slime3.sprite.y);
      this.slime4.sprite.setVisible(true).setPosition(this.slime4.sprite.x, this.slime4.sprite.y);
    }
  }

  // PLAY ANIMATIONS FOR KEYCARDS + ENEMIES
  playObjectAnimations() {
    this.keyCardSecondFloor.sprite.anims.play("keyCardFlash", true);
    this.keyCardThirdFloor.sprite.anims.play("keyCardFlash", true);
    this.keyCardFourthFloor.sprite.anims.play("keyCardFlash", true);
    this.slime1.sprite.anims.play('enemy', true);
    this.slime2.sprite.anims.play('enemy', true);
    this.slime3.sprite.anims.play('enemy', true);
    this.slime4.sprite.anims.play('enemy', true);
  }

  // PLAYER PICK UP OBJECTS
  pickUpKeyCards() {
    if (this.scene.get('LightScene').scene.isVisible() && this.player.sprite)
      this.keyCardSecondFloor.sprite.destroy(true);
  }

  // ENEMY PATHWAYS
  enemyPathways() {
    this.slime1.sprite.setVelocity(2);
    this.slime2.sprite.setVelocity(2);
    this.slime3.sprite.setVelocity(2);
    this.slime4.sprite.setVelocity(2);
  }

  // PLAYER ANIMATIONS - IDLE, WALK AND SWITCH & KEYCARD ANIMATION

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

    this.anims.create({
      key: 'keyCardFlash',
      frames: this.anims.generateFrameNumbers('keyCardSprite', {
        start: 0,
        end: 11
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy',
      frames: this.anims.generateFrameNumbers('slime', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: -1,
    });
  }

  // CREATE LIGHTS (VERY MESSY)

  createLights() {
    var lightA = this.matter.add.image(1270, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightA, 80, 0.1, {
      pointA: {
        x: 1220,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightA, 80, 0.1, {
      pointA: {
        x: 1300,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightB = this.matter.add.image(1370, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightB, 80, 0.1, {
      pointA: {
        x: 1320,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightB, 80, 0.1, {
      pointA: {
        x: 1400,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightC = this.matter.add.image(1470, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightC, 80, 0.1, {
      pointA: {
        x: 1420,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightC, 80, 0.1, {
      pointA: {
        x: 1500,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    //   var lightD = this.matter.add.image(2475, 1530, 'light', null, {
    //     shape: 'rectangle'
    //   }).setScale(1);
    //
    //   this.matter.add.worldConstraint(lightD, 50, 0.1, {
    //     pointA: {
    //       x: 2450,
    //       y: 1500
    //     },
    //     pointB: {
    //       x: -20,
    //       y: 0
    //     }
    //   });
    //
    //   this.matter.add.worldConstraint(lightD, 50, 0.1, {
    //     pointA: {
    //       x: 2500,
    //       y: 1500
    //     },
    //     pointB: {
    //       x: 20,
    //       y: 0
    //     }
    //   });
    //
    //   var lightE = this.matter.add.image(2575, 1530, 'light', null, {
    //     shape: 'rectangle'
    //   }).setScale(1);
    //
    //   this.matter.add.worldConstraint(lightE, 50, 0.1, {
    //     pointA: {
    //       x: 2550,
    //       y: 1500
    //     },
    //     pointB: {
    //       x: -20,
    //       y: 0
    //     }
    //   });
    //
    //   this.matter.add.worldConstraint(lightE, 50, 0.1, {
    //     pointA: {
    //       x: 2600,
    //       y: 1500
    //     },
    //     pointB: {
    //       x: 20,
    //       y: 0
    //     }
    //   });
    //
    //   var lightF = this.matter.add.image(2675, 1530, 'light', null, {
    //     shape: 'rectangle'
    //   }).setScale(1);
    //
    //   this.matter.add.worldConstraint(lightF, 50, 0.1, {
    //     pointA: {
    //       x: 2650,
    //       y: 1500
    //     },
    //     pointB: {
    //       x: -20,
    //       y: 0
    //     }
    //   });
    //
    //   this.matter.add.worldConstraint(lightF, 50, 0.1, {
    //     pointA: {
    //       x: 2700,
    //       y: 1500
    //     },
    //     pointB: {
    //       x: 20,
    //       y: 0
    //     }
    //   });
    // }

  }
}
