const fs = require('fs');
const { toDartType } = require('./utils.js');
const { toDartValue } = require('./dartValue');
const _template = require('lodash/template');
const _ = require('style-dictionary/lib/utils/es6_');
const { fileHeader, sortByReference, sortByName, } = require('style-dictionary/lib/common/formatHelpers');

const supportedCategories = ['color',
    'sizing',
    'spacing',
    'borderWidth',
    'fontSizes',
    'textCase',
    'lineHeights',
    'fontFamilies',
    'fontWeights',
    'letterSpacing',
    'textDecoration',
    'typography',
    'composition',
    "gradient",
    'borderRadius',
    'boxShadow'
];

function groupBy(list, keyGetter) {
    var map = {};
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map[key];
        if (!collection) {
            map[key] = [item];
        } else {
            collection.push(item);
        }
    });
    return map;
} 

function groupTokensByCategory(dictionary, options) {
    var allTokens;

    const { outputReferences } = options;

    if (outputReferences) {
        allTokens = [...dictionary.allTokens].sort(sortByReference(dictionary));
    } else {
        allTokens = [...dictionary.allTokens].sort(sortByName);
    }

    allTokens = allTokens.filter(token => supportedCategories.indexOf(token.type) >= 0)

    return groupBy(allTokens, function (token) {
        return _.upperFirst(toDartType(token));
    });
}

module.exports = {
    'flutter/style/data.dart': function ({ dictionary, options, file }) {
        const template = _template(
            fs.readFileSync(__dirname + '/templates/appstyle.dart.template')
        );
        return template({ allTokens: groupTokensByCategory(dictionary, options), camelCase: _.camelCase, toDartType, toDartValue, file, options, fileHeader });
    }
}
