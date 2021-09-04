import * as PIXI from 'pixi.js'

const loadAssets = (filenames) => {
  const textures = {};
  const sprites = {};
  filenames.forEach(file => {
    const assetName = `assets/${file}`;
    const resourceName= file.substr(0, file.indexOf('.')); 
    textures[resourceName] = PIXI.Texture.from(assetName);
    sprites[resourceName] = new PIXI.Sprite(textures[resourceName]);
  });

  return sprites;
}

const draw = (app, loadedAssets) => {
  const { particle, fountain, rocket } = loadedAssets;

  fountain.anchor.set(0.5)
  fountain.x = 200
  fountain.y = 200

  particle.anchor.set(0.5)
  particle.x = 250
  particle.y = 250

  rocket.anchor.set(0.5)
  rocket.x = 300
  rocket.y = 300
  
  Object.keys(loadedAssets).forEach((key) => {
    const asset = loadedAssets[key];
    app.stage.addChild(asset)
  });
   // app.stage.addChild(particle)
}

const update = (loadedAssets, delta) => {
  const { particle, fountain, rocket } = loadedAssets;
  particle.rotation -= 0.01 * delta;
  fountain.rotation -= 0.01 * delta;
  rocket.rotation -= 0.01 * delta;
}

const run = (app) => {
  const assets = ['particle.png', 'fountain.png', 'rocket.png'];
  const loadedAssets = loadAssets(assets);

  // draw resources
  draw(app, loadedAssets);
  // start the game loop
  app.ticker.add((delta) => {
    update(loadedAssets, delta);
  });
}


const app = new PIXI.Application({
  width: 720,
  height: 1280,
  backgroundColor: 0x1099bb,
  view: document.querySelector('#scene')
});

run(app)