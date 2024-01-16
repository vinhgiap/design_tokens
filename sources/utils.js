
function toDartType(prop) {
    switch (prop.type) {
        case 'color':
            if (prop.value.toLowerCase().startsWith('Linear'.toLowerCase())) {
                return 'Gradient';
            } else {
                return 'Color';
            }
        case 'sizing':
            return 'Sizing';
        case 'spacing':
            return 'Spacing';
        case 'borderWidth':
            return 'BorderWidth';
        case 'fontSizes':
            return 'FontSize';   
        case 'textCase':
            return 'TextCase';
        case 'lineHeights':
            return 'LineHeight';
        case 'fontFamilies':
            return 'FontFamily';
        case 'fontWeights':
            return 'FontWeight';    
        case 'letterSpacing':
            return "LetterSpacing"    
        case 'textDecoration':
            return "TextDecoration"
        case 'typography':
            return 'Typography';
        case 'composition':
            return 'Composition';
        case "gradient":
            return 'Gradient';
        case 'borderRadius':
            return 'BorderRadius';
        case 'boxShadow':
            return 'BoxShadow';  
        default:
            return 'Object';
    }
}

module.exports = {
    toDartType,
}