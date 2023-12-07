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

  StyleDictionary.registerTransformGroup({
    name: 'figma-android',
    transforms: [
      'attribute/cti',
       'name/cti/camel',
    ]
  });

  const extendStyle = StyleDictionary.extend({
    "source": [
      "input/*.json"
    ],
    "platforms": {
      "ios": {
        "transformGroup": "figma-ios",
        "buildPath": "output/ios/",
        "files": [{
          "destination": "StyleDictionary.swift",
          "format": "ios-swift/class.swift",
          "className": "StyleDictionaryClass",
      }]
      },
      "android": {
        "transformGroup": "figma-android",
        "buildPath": "output/android/",
        "files": [{
          "format": "android/resources",
          "filter": {
            "attributes": { "type": "color" }
          },
          "destination": "gen_color.xml",
        },
        {
          "format": "android/resources",
          "filter": {
            "attributes": { "type": "borderRadius" }
          },
          "destination": "gen_radius.xml",
        },
        {
          "format": "android/resources",
          "filter": {
            "attributes": { "type": "borderWidth" }
          },
          "destination": "gen_border.xml",
        },
        {
          "format": "android/resources",
          "filter": {
            "attributes": { "type": "fontSizes" }
          },
          "destination": "gen_fontsize.xml",
        }
        ]
      }
    }
  });

  extendStyle.buildAllPlatforms();
