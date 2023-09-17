function convertToShadow(value) {
    var offset = `CGSize(width: ${value.x}, height: ${value.y})`;

    
    var str = ``
    if (value.color.lenght > 7) {
        str = value.color.substring(1).slice(0, -2).toUpperCase();
    } else {
        str = value.color.substring(1).toUpperCase();
    }

    var color = `UIColor(rgb: 0x${str})`;
    
    var shadowOpactity = 1;
    if (value.color.length > 7) {
        shadowOpactity = 0.25
    }

    return `TokenShadow(
      offset: ${offset},
      blur: ${value.blur},
      color: ${color},
      shadowOpactity: ${shadowOpactity}
    )`;
}

function convertToBorder(value) {
    var color = convertCustomColor(value.color);
    return `TokenBorder(
      borderColor: ${color},
      borderWidth: ${value.width}
    )`;
}

function convertFontWeight(value) {
    switch (value) {
        case 'Bold':
            return 'UIFont.Weight.bold';
        case 'Regular':
            return 'UIFont.Weight.regular';
        default:
            return token.value;
    }
}

function convertTypography(value) {
    return `TokenTypo(
        fontFamily: "${value.fontFamily}-${value.fontWeight}",
        fontWeight: ${convertFontWeight(value.fontWeight)},
        fontSize: ${value.fontSize}
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