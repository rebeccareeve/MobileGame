var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  parent: 'phaser-example',
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 0.8
      },
      debug: true,
      debugBodyColor: 0xffffff
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};

function preload() {
  this.load.image('light', 'assets/light.png');
  this.load.image('cable', 'assets/attatchment.png');
}

var game = new Phaser.Game(config);

function create() {
  this.matter.world.setBounds();
  this.matter.add.mouseSpring();

  var lightA = this.matter.add.image(400, 400, 'light', null, {
    shape: 'rectangle'
  }).setScale(3);
  // var lightB = this.matter.add.image(350, 200, 'light', null, {
  //   shape: 'rectangle'
  // }).setScale(3);
  // var cableA = this.matter.add.image(200, 100, 'cable', null, {
  //   shape: 'rectangle'
  // }).setScale(3).setStatic(true);
  // var cableB = this.matter.add.image(400, 100, 'cable', null, {
  //   shape: 'rectangle'
  // }).setScale(3).setStatic(true);
  //
  // this.matter.add.constraint(lightB, cableB, 300, 1);
  // this.matter.add.constraint(lightA, cableB, 300, 1);

  this.matter.add.worldConstraint(lightA, 200, 0.1, {
    pointA: { x: 300, y: 250},
    pointB: {x: -50, y: 0}
  });

  this.matter.add.worldConstraint(lightA, 200, 0.1, {
    pointA: { x: 550, y: 250},
    pointB: {x: 50, y: 0}
  });

  var bod = Phaser.Physics.Matter.Matter.Bodies;
  var rect1 = bod.rectangle(400, 400, 20, 20);
  this.matter.world.add(rect1);
}
