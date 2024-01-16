const StyleDictionary = require('style-dictionary');
const transforms = require('./source/ios');

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

  StyleDictionary.registerTransformGroup({
    name: 'figma-android',
    transforms: [
      "attribute/cti",
      "name/cti/camel",
      "color/hex",
      "size/remToSp",
      "size/remToDp"
    ]
  });

  const extendStyle = StyleDictionary.extend({
    "source": [
      "input/*.json"
    ],
    "platforms": {
      "ios": {
        "transformGroup": "ios-swift",
        "buildPath": "output/ios/",
        "files": [{
          "destination": "StyleDictionary+Class.swift",
          "format": "ios-swift/class.swift",
          "className": "StyleDictionaryClass",
          "filter": {}
        }]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": "output/android/",
        "files": [{
          "destination": "colors.xml",
          "format": "android/colors"
        }]
      }
    }
  });

  extendStyle.buildAllPlatforms();
