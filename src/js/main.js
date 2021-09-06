import * as PIXI from 'pixi.js'
import * as particles from '@pixi/particle-emitter'

const particleConfig =
{
  alpha: {
		start: 1,
		end: 1
	},
	scale: {
		start: 0.1,
		end: 0.01,
		minimumScaleMultiplier: 1
	},
	color: {
		start: "#ffffff",
		end: "#ff0000"
	},
	speed: {
		start: 200,
		end: 50,
		minimumSpeedMultiplier: 1
	},
	acceleration: {
		x: 0,
		y: 0
	},
	maxSpeed: 0,
	startRotation: {
		min: 0,
		max: 360
	},
	noRotation: false,
	rotationSpeed: {
		min: 0,
		max: 0
	},
	lifetime: {
		min: 0.001,
		max: 1
	},
	blendMode: 'screen',
	frequency: 0.001,
	emitterLifetime: -1,
	maxParticles: 1000,
	pos: {
		x: 200,
		y: 200
	},
	addAtBack: false,
	spawnType: 'point',
  behaviors: [
      {
          type: 'textureSingle',
          config: {
              texture: PIXI.Texture.from('assets/particle.png')
          }
      }
  ],
}

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

const loadParticles = (container) => {
  debugger;
  const emitter = ['test_particle', new particles.Emitter(container, particleConfig)];

  return {
    [emitter[0]]: emitter[1]
  }
}

const draw = (app) => {
  // load assets
  const assets = ['fountain.png', 'rocket.png'];
  const loadedAssets = loadAssets(assets);
  const { fountain, rocket } = loadedAssets;

  // create container for particles, add it to main stage and load particles into it
  const container = new PIXI.ParticleContainer();
  app.stage.addChild(container);
  const loadedParticles = loadParticles(container);

  fountain.anchor.set(0.5)
  fountain.x = 200
  fountain.y = 200

  rocket.anchor.set(0.5)
  rocket.x = 300
  rocket.y = 300
  
  Object.keys(loadedAssets).forEach((key) => {
    const asset = loadedAssets[key];
    app.stage.addChild(asset)
  });

  return {
    loadedAssets,
    loadedParticles
  }
}

const update = (loadedAssets, loadedParticles, delta, time) => {
  const { fountain, rocket } = loadedAssets;
  fountain.rotation -= 0.01 * delta;
  rocket.rotation -= 0.01 * delta;

  const { test_particle } = loadedParticles;
  const now = Date.now()
	test_particle.update((now - time.elapsed) * 0.001);
  time.updateElapsedTime(now);
}

const run = (app) => {
  let elapsed = Date.now();
  const time = {
    elapsed,
    updateElapsedTime: function (updatedTime) {
      this.elapsed = updatedTime;
    }
  }
  // draw resources
  const {loadedAssets, loadedParticles} = draw(app);
  loadedParticles['test_particle'].emit = true;
  // start the game loop
  app.ticker.add((delta) => {
    update(loadedAssets, loadedParticles, delta, time);
  });
}


const app = new PIXI.Application({
  width: 860,
  height: 640,
  backgroundColor: 'black',
  view: document.querySelector('#scene')
});

run(app)