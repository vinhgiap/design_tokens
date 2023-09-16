const StyleDictionary = require('style-dictionary');
const transforms = require('./source/tranforms');

for (const key in transforms) {
    const transform = transforms[key];
    StyleDictionary.registerTransform({
      name: key,
      ...transform
    })
  }

StyleDictionary.registerTransformGroup({
    name: 'figma-ios',
    transforms: [
      'attribute/cti',
       'name/cti/camel', 
      ...Object.getOwnPropertyNames(transforms),
    ]
  });

  const extendStyle = StyleDictionary.extend({
    "source": [
      "input/*.json"
    ],
    "platforms": {
      "ios": {
        "transformGroup": "figma-ios",
        "buildPath": "output/",
      }
    }
  });

  extendStyle.buildAllPlatforms();
