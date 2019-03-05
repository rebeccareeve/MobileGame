class BaseScene extends Phaser.Scene {
  constructor(id) {
    super(id)
    this.id = id;
  }

  preload() {
    this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
    this.load.image('city', 'assets/skyline-a.png');
    this.load.image('cityClose', 'assets/near-buildings-bg.png');
    this.load.image("buildingTiles", "assets/tileset.png");
    this.load.image("officeTiles", "assets/Office_furniture_set.png");
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

    //cat 0x0016
    //mask 0x0064

    var mouseSpring = this.matter.add.mouseSpring();

    mouseSpring.constraint.collisionFilter.category=0x0064 //TODO Write up about it (catagories and masks)
    mouseSpring.constraint.collisionFilter.mask=0x0016 //TODO Write up about it (catagories and masks)
    this.map = this.make.tilemap({key: this.tileDataKey});

    this.buildingTileset = this.map.addTilesetImage("BuildingTileset", "buildingTiles");
    this.officeTileset = this.map.addTilesetImage("Office_furniture_set", "officeTiles");
    this.backgroundLayer = this.map.createStaticLayer("Background", this.buildingTileset, 0, 0).setDepth(3);
    this.buildingLayer = this.map.createDynamicLayer("Building", this.buildingTileset, 0, 0).setDepth(3);
    this.objectsLayer = this.map.createStaticLayer("Objects", this.officeTileset, 0, 0).setDepth(3);
    this.decorationsLayer = this.map.createStaticLayer("Decorations", this.officeTileset, 0, 0).setDepth(3);
    this.decorationsDarkLayer = this.map.createStaticLayer("Decorations Dark", this.buildingTileset, 0, 0).setDepth(3);

    this.add.image(0, 0, 'city', null).setOrigin(0, 0).setScale(10.2).setDepth(0);
    this.add.image(1200, 0, 'city', null).setOrigin(0, 0).setScale(10.2).setDepth(0);
    this.add.image(2200, 0, 'city', null).setOrigin(0, 0).setScale(10.2).setDepth(0);
    this.add.image(-200, 1175, 'cityClose', null).setOrigin(0, 0).setScale(4).setDepth(1);

    this.player = new Player(this, 140, 1984);
    this.scene.launch('UIScene');

    this.createAnimations()

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


  update(time, delta) {
    this.checkPlayerMovement();

    if(Phaser.Input.Keyboard.JustDown(this.keySpace)){
        switch(this.id) {
          case 'LightScene':
          this.scene.manager.getScene('DarkScene').player.sprite.setX(this.player.sprite.x);
          this.scene.manager.getScene('DarkScene').player.sprite.setY(this.player.sprite.y);
          this.scene.switch('DarkScene');
          break;
          case 'DarkScene':
          this.scene.manager.getScene('LightScene').player.sprite.setX(this.player.sprite.x);
          this.scene.manager.getScene('LightScene').player.sprite.setY(this.player.sprite.y);
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
