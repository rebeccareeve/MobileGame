class DarkScene extends BaseScene {
  constructor() {
    super('DarkScene')
    this.tileDataKey = 'mapDark'
    this.tileDataSource = 'assets/MobileGameMapDark.json'
  }
  preload() {
    super.preload();
    this.load.image("screenFace", "assets/face.png");
    this.load.image('locker', 'assets/locker.png');

  }

  create() {
    super.create();
    this.monitorTileset = this.map.addTilesetImage("monitor-face-4", "screenFace");
    this.facesLayer = this.map.createStaticLayer("Faces", this.monitorTileset, 0, 0).setDepth(3);
    this.scene.get('DarkScene').scene.setVisible(false);

    var platform1 = this.matter.add.rectangle(2960, 1960, 44, 17, {
      isStatic: true,
    });
    var platform2 = this.matter.add.rectangle(3025, 1928, 44, 17, {
      isStatic: true,
    });
    var platform3 = this.matter.add.rectangle(3087, 1896, 44, 17, {
      isStatic: true,
    });
    var platform4 = this.matter.add.rectangle(3153, 1864, 44, 17, {
      isStatic: true,
    });

    var cupboardStairsTallDark = this.matter.add.rectangle(2800, 1609, 60, 48, {
      isStatic: true,
    });

    var cupboardStairsShortDark = this.matter.add.rectangle(2863, 1615, 63, 30, {
      isStatic: true,
    });

    var thirdFloorWallBlockDark = this.matter.add.rectangle(2120, 1553, 3, 160, {
      isStatic: true,
    });

    var locker = this.matter.add.image(2775, 1432, 'locker', null, {
      shape: 'rectangle',
      isStatic: false,
    }).setDepth(5);

    var desk = this.matter.add.image(1775, 1632, 'desk', null, {
      shape: 'rectangle',
      isStatic: false,
    }).setDepth(5);
  }
}
