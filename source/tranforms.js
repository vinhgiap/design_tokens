function convertToShadow(value) {
    var offset = `CGSize(width: ${value.x}, height: ${value.y})`;
    var color = convertCustomColor(value.color);
    return `TokenShadow(
      offset: ${offset},
      color: ${color},
      blur: ${value.blur}
    )`;
}

function convertToBorder(value) {
    var color = convertCustomColor(value.color);
    return `TokenBorder(
      borderWidth: ${value.width},
      borderColor: ${color}
    )`;
}

function convertTypography(value) {
    return `TokenTypo(
        fontFamily: ${value.fontFamily},
        fontSize: ${value.fontSize},
        fontWeight: ${value.fontWeight}
      )`;
}

function convertCustomColor(value) {

    if (typeof value === "string") {
        var str = value.substring(1).toUpperCase();
        if (str.length > 7) {
            return `UIColor(argb: 0x${str})`;
        } else {
            return `UIColor(rgb: 0x${str})`;
        }
    } else {
        return value;
    }
}

module.exports = {
    'ios/fontWeight': {
        type: 'value',
        matcher: token => token.type === 'fontWeights',
        transformer: token => {
            switch (token.value) {
                case 'Bold':
                    return 'UIFont.Weight.bold';
                case 'Regular':
                    return 'UIFont.Weight.regular';
                default:
                    return token.value;
            }
        }
    },
    'ios/borderRadius': {
        type: 'value',
        matcher: token => token.type === 'borderRadius',
        transformer: token => `CGFloat(${token.value})`
    },
    'ios/customHexColor': {
        type: 'value',
        matcher: token => {
            return (
                token.type === 'color' &&
                typeof token.value == 'string'
            );
        },
        transformer: token => {
            return convertCustomColor(token.value);
        }
    },
    'ios/boxShadow': {
        type: 'value',
        matcher: token => token.type === 'boxShadow',
        transformer: token => {
            var shadow = convertToShadow(token.value);
            return shadow;
        }
    },
    'ios/fontFamilies': {
        type: 'value',
        matcher: token => token.type === 'fontFamilies',
        transformer: token => `"${token.value}"`
    },
    'ios/Typo': {
        type: 'value',
        transitive: true,
        matcher: token => {
            return token.type === 'typography';
        },
        transformer: ({ value, name, type }) => {
            if (!value) return;
            return convertTypography(value);
        }
    },
    'ios/border': {
        type: 'value',
        transitive: true,
        matcher: token => {
            return token.type === 'border';
        },
        transformer: ({ value, name, type }) => {
            if (!value) return;
            return convertToBorder(value);
        }
    }
}