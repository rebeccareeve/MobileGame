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
  }

  create() {
    this.map = this.make.tilemap({
      key: this.tileDataKey
    });

    // this.player = new Player(this, 140, 1984);

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

        this.scene.launch('UIScene');

    // this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

}


  update(time, delta) {

    }
