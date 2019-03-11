class LightScene extends BaseScene {
  constructor() {
    super('LightScene')
    this.tileDataKey = 'map'
    this.tileDataSource = 'assets/MobileGameMap.json'
  }
  preload() {
    super.preload();

  }
  create() {
    super.create();
    this.liftsLayer = this.map.createStaticLayer("Lifts", this.officeTileset, 0, 0).setDepth(3);


    this.scene.launch('SpriteScene');
    this.scene.launch('UIScene');
    this.scene.launch('DarkScene');

    var firstFloorWallBlockLight = this.matter.add.rectangle(3128, 1903, 3, 160, {
      isStatic: true,
    });

    var thirdFloorWallBlockLight = this.matter.add.rectangle(2728, 1553, 3, 160, {
      isStatic: true,
    });

    var cupboardStairsTallLight = this.matter.add.rectangle(2095, 1609, 60, 48, {
      isStatic: true,
    });
    var cupboardStairsShort1Light = this.matter.add.rectangle(2032, 1615, 63, 30, {
      isStatic: true,
    });
    var cupboardStairsShort2Light = this.matter.add.rectangle(2158, 1615, 63, 30, {
      isStatic: true,
    });

    for (var i = 0; i < 6; i++) {
      this.liftLeft(1150, (1770 - 176 * i), 2, 75)
    };

    for (var i = 0; i < 5; i++) {
      this.liftRight(3170, (1770 - 176 * i), 2, 75)
    };
  }

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

}
