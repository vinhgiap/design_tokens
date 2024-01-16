const TinyColor = require('tinycolor2')
const _ = require('style-dictionary/lib/utils/es6_');
const Color = require('color');

function convertToShadow(value) {
    var offset = `Offset(${value.x}, ${value.y})`;
    var color = convertCustomColor(value.color);
    return `BoxShadow(
      color: ${color},
      offset: ${offset},
      spreadRadius: ${value.spread},
      blurRadius: ${value.blur},
    )`;
}

function convertComposition(value) {

    var result = "AppComposition("

    if (value.fill && value.fill.startsWith("Color")) {
        result += `fillColor: ${value.fill}, `;
    }

    if (value.fill && value.fill.startsWith("LinearGradient")) {
        result += `fillGradient: ${value.fill}, `;
    }

    if (value.typography) {
        result += `typography: ${value.typography}, `;
    }

    if (value.borderRadius) {
        result += `borderRadius: ${value.borderRadius}, `;
    }

    if (value.height) {
        result += `height: ${value.height}, `;
    }

    if (value.itemSpacing) {
        result += `itemSpacing: ${value.itemSpacing}, `;
    }

    if (value.paddingLeft && value.paddingRight) {
        var padding = `EdgeInsets.only(left: ${value.paddingLeft}, right: ${value.paddingRight})`;
        result += `padding: ${padding}, `;
    }

    if (value.verticalPadding && value.horizontalPadding) {
        var padding = `EdgeInsets.symmetric(vertical: ${value.verticalPadding}, horizontal: ${value.horizontalPadding})`;
        result += `padding: ${padding}, `;
    }

    if (value.textDecoration) {
        result += `textDecoration: ${value.textDecoration}, `;
    }

    result += ')';

    return result;
}

function convertTypography(value) {
    var textStyle = 'TextStyle(';
    if (value.fontFamily) textStyle += 'fontFamily: ' + value.fontFamily + ',';
    if (value.fontSize) textStyle += ` fontSize: ${value.fontSize}` + ',';
    if (value.fontWeight) textStyle += ` fontWeight: ${value.fontWeight}` + ',';
    if (value.letterSpacing) textStyle += ` letterSpacing: ${value.letterSpacing}` + ',';
    if (value.lineHeight) textStyle += ` height: ${value.lineHeight}` + ",";
    if (value.textDecoration) textStyle += ` decoration: ${value.textDecoration}`;
    textStyle += ')';

    var result = `AppTypography( textStyle: ${textStyle}, `;
    if (value.textCase) {

        result += `textCase: ${value.textCase}`
    }
    result += ')';
    return result;
}

function convertGradient(value) {
    function convertLinear(value) {
        var gradientValue = value.replace("linear-gradient", "").replace("(", "").replace(")", "").split(",");
        var deg = gradientValue.shift();
        let begin;
        let end;
        switch (deg) {
            case "45deg":
                begin = "Alignment.topLeft";
                end = "Alignment.bottomRight";
            case "90deg":
                begin = "Alignment.topCenter";
                end = "Alignment.bottomCenter";
            default:
                begin = "Alignment.centerLeft";
                end = "Alignment.centerRight";
        }

        var colors = `[${gradientValue.map(it => convertCustomColor(it.trim()))}]`;
        return `LinearGradient(
            begin: ${begin},
            end: ${end},
            colors: ${colors}
        )`;
    }

    if (typeof value === "string") {
        if (value.includes("linear-gradient")) {
            // convert linear-gradient
            return convertLinear(value);
        } else {
            /// need refactor if has other gradient style.
            return value;
        }
    } else {
        return value;
    }
}


function convertCustomColor(value) {
    function changeColorAlpha(color, opacity) {
        //if it has an alpha, remove it
        if (color.length > 7)
            color = color.substring(0, color.length - 2);

        // coerce values so ti is between 0 and 1.
        const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
        let opacityHex = _opacity.toString(16).toUpperCase()

        // opacities near 0 need a trailing 0
        if (opacityHex.length == 1)
            opacityHex = "0" + opacityHex;

        return color + opacityHex;
    }

    if (typeof value === "string") {
        if (value.startsWith("#")) {
            if (value.includes("%")) {
                const items = value.trim().split(" ");
                var colorHext = items.at(0);
                var op = parseFloat(items.at(1).replace("%", "")) / 100;
                var alphe = changeColorAlpha(colorHext, op);
                var str = TinyColor(alphe).toHex8().toUpperCase();
                return `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
            } else {
                var str = TinyColor(value).toHex8().toUpperCase();
                return `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
            }
        } else {
            var isOpacity = value.includes('%');
            if (isOpacity) {
                var alpha = value.replace(")", "").replace("(", "").split(",").pop();
                var op = parseFloat(alpha.replace("%", "")) / 100;
                var rbga = value.replace(`${alpha}`, `${op}`);
                var str = TinyColor(rbga).toHex8().toUpperCase();
                return `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
            } else {
                var str = TinyColor(value).toHex8().toUpperCase();
                return `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
            }
        }
    } else {
        return value;
    }

}

module.exports = {
    'flutter/fontWeight': {
        type: 'value',
        matcher: token => token.type === 'fontWeights',
        transformer: token => {
            switch (token.value) {
                case 'Bold':
                    return 'FontWeight.w700';
                case 'SemiBold':
                    return 'FontWeight.w600';
                case 'Regular':
                    return 'FontWeight.w400';
                default:
                    return token.value;
            }
        }
    },
    'flutter/boderRadius': {
        type: 'value',
        matcher: token => token.type === 'borderRadius',
        transformer: token => `BorderRadius.all(Radius.circular(${token.value}))`
    },
    'flutter/customSpacing': {
        type: 'value',
        matcher: token => token.type === 'spacing',
        transformer: token => `${token.value}`
    },
    'flutter/customSizing': {
        type: 'value',
        matcher: token => ['fontSizes', 'sizing', 'borderWidth'].includes(token.type),
        transformer: token => token.value
    },
    'flutter/customHexColor': {
        type: 'value',
        matcher: token => {
            return (
                token.type === 'color' &&
                !token.$extensions &&
                typeof token.value == 'string' &&
                (token.value.startsWith('#') || token.value.startsWith('rgba'))
            );
        },
        transformer: token => {
            return convertCustomColor(token.value);
        }
    },
    'flutter/colorModifier': {
        type: 'value',
        transitive: true,
        matcher: token => {
            return (
                token.type === 'color' &&
                token.$extensions &&
                token.$extensions['studio.tokens'] &&
                token.$extensions['studio.tokens'].modify &&
                token.$extensions['studio.tokens'].modify.type &&
                token.$extensions['studio.tokens'].modify.space &&
                ['alpha', 'lighten', 'darken', 'mix'].includes(
                    token.$extensions['studio.tokens'].modify.type
                ) &&
                ['hsl', 'lch'].includes(token.$extensions['studio.tokens'].modify.space)
            );
        },
        transformer: token => {
            const extensionModifier = token.$extensions['studio.tokens'].modify;
            var hexColor = token.value.replace(")", "").replace("Color(0x", "#");
            const originalColor = Color(hexColor);
            let newValue;
      
            switch (extensionModifier.type) {
              case 'mix':
                newValue = originalColor
                  .mix(Color(extensionModifier.color), extensionModifier.value)
                  .string();
                break;
              default:
                newValue = originalColor[extensionModifier.type](
                  extensionModifier.value
                )
                  [extensionModifier.space]()
                  .string();
                break;
            }
            var str = TinyColor(newValue).toHex8().toUpperCase();
            return `Color(0x${str.slice(6)}${str.slice(0, 6)})`; 
        }
    },
    'flutter/boxShadow': {
        type: 'value',
        matcher: token => token.type === 'boxShadow',
        transformer: token => {
            var isArray = Array.isArray(token.value);
            var shadows = isArray ? `[${token.value.map(it => convertToShadow(it))}]` : `[${convertToShadow(token.value)}]`;
            return shadows;
        }
    },
    'flutter/textDecoration': {
        type: 'value',
        matcher: token => token.type === 'textDecoration',
        transformer: token => {
            switch (token.value) {
                case 'Underline':
                    return 'TextDecoration.underline';
                case 'none':
                    return 'TextDecoration.none';
                default:
                    return 'TextDecoration.none';
            }
        }
    },
    'flutter/lineHeight': {
        type: 'value',
        matcher: token => token.type === 'lineHeights',
        transformer: token => {
            var value = parseFloat(token.value.replace("%", ""));
            return value / 100;
        }
    },
    'flutter/letterSpacing': {
        type: 'value',
        matcher: token => token.type === 'letterSpacing',
        transformer: token => {
            if (token.value.includes("%")) {
                var value = parseFloat(token.value.replace("%", ""));
                return value / 100;
            } else {
                return token.value;
            }
        }
    },
    'flutter/fontFamilies': {
        type: 'value',
        matcher: token => token.type === 'fontFamilies',
        transformer: token => `"${token.value}"`
    },
    'flutter/textCase': {
        type: 'value',
        matcher: token => token.type === 'textCase',
        transformer: token => `TextCase.${token.value}`
    },'flutter/colorGradient': {
        type: 'value',
        matcher: token => token.type === 'color' && token.value.startsWith('linear-gradient'),
        transformer: token => convertGradient(token.value)
    },
    'flutter/gradient': {
        type: 'value',
        matcher: token => token.type === 'gradient',
        transformer: token => convertGradient(token.value)
    },
    'flutter/flutterComposition': {
        type: 'value',
        transitive: true,
        matcher: token => {
            return token.type === 'composition';
        },
        transformer: ({ value, name, type }) => {
            if (!value) return;
            return convertComposition(value);
        }
    },
    'flutter/flutterTypo': {
        type: 'value',
        transitive: true,
        matcher: token => {
            return token.type === 'typography';
        },
        transformer: ({ value, name, type }) => {
            if (!value) return;
            return convertTypography(value);
        }
    }
}