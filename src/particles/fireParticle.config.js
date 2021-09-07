export default {
    "alpha": {
          "start": 0.62,
          "end": 0
      },
      "scale": {
          "start": 0.25,
          "end": 0.75,
          "minimumScaleMultiplier": 1
      },
      "color": {
          "start": "#fff191",
          "end": "#ff622c"
      },
      "speed": {
          "start": 500,
          "end": 500,
          "minimumSpeedMultiplier": 1
      },
      "acceleration": {
          "x": 0,
          "y": 0
      },
      "maxSpeed": 0,
      "startRotation": {
          "min": 265,
          "max": 275
      },
      "noRotation": false,
      "rotationSpeed": {
          "min": 50,
          "max": 50
      },
      "lifetime": {
          "min": 0.1,
          "max": 0.75
      },
      "blendMode": "normal",
      "frequency": 0.001,
      "emitterLifetime": -1,
      "maxParticles": 1000,
      "pos": {
          "x": 0,
          "y": 0
      },
      "addAtBack": false,
      "spawnType": "circle",
      "spawnCircle": {
          "x": 0,
          "y": 0,
          "r": 10
      },
    "behaviors":[
       {
          "type":"alpha",
          "config":{
             "alpha":{
                "list":[
                   {
                      "time":0,
                      "value":0.8
                   },
                   {
                      "time":1,
                      "value":0.1
                   }
                ]
             }
          }
       },
       {
          "type":"moveSpeedStatic",
          "config":{
             "min":200,
             "max":200
          }
       },
       {
          "type":"color",
          "config":{
             "color":{
                "list":[
                   {
                      "time":0,
                      "value":"fd1111"
                   },
                   {
                      "time":1,
                      "value":"f7a134"
                   }
                ]
             }
          }
       },
       {
          "type":"textureRandom",
          "config":{
             "textures":[
                "assets/Fire.png",
  
             ]
          }
       },
       {
        "type": "movePath",
        "config": {
             "path": "sin(x/10) * 20",
             "speed": {
                 "list": [{"value": 10, "time": 0}, {"value": 100, "time": 0.25}, {"value": 0, "time": 1}]
             },
             "minMult": 0.8
        }
      }
    ]
  }