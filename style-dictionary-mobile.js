
const StyleDictionary = require('style-dictionary');
const transforms = require('./sources/tranforms');
const formats = require('./sources/formats');


for (const key in transforms) {
  const transform = transforms[key];
  StyleDictionary.registerTransform({
    name: key,
    ...transform
  })
}

StyleDictionary.registerTransformGroup({
  name: 'figma-flutter',
  transforms: [
    'attribute/cti',
     'name/cti/camel', 
    ...Object.getOwnPropertyNames(transforms),
  ]
});

for (const key in formats) {
  const formatter = formats[key];
  StyleDictionary.registerFormat({
      name: key,
      formatter: formatter,
  });
}

const extendStyle = StyleDictionary.extend({
  "source": [
    "input/**/*.json"
  ],
  "platforms": {
    "flutter": {
      "transformGroup": "figma-flutter",
      "buildPath": "output/",
      "files": [{
            "destination": "appstyle.dart",
            "format": "flutter/style/data.dart",
            "prefix": "Style"
        }],
    }
  }
});

extendStyle.buildAllPlatforms();


