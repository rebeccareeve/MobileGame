var config = {
  type: Phaser.AUTO,
  width: 3408,
  height: 2000,
  backgroundColor: '#000000',
  parent: 'phaser-example',
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 2
      },
      debug: false,
      debugBodyColor: 0xffffff
    }
  },
  scene: [DarkScene, LightScene, SpriteScene, UIScene],
  callbacks: {
    postBoot: function() {
      resize();
    }
  }
};

var game = new Phaser.Game(config);

function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
