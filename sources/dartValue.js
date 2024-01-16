function toDartValue(style) {
    switch (style) {
        case 'Color':
            return 'Color';
        case 'Sizing':
            return 'double';
        case 'Spacing':
            return 'double';
        case 'BorderWidth':
            return 'double';
        case 'FontSize':
            return 'double';   
        case 'TextCase':
            return 'TextCase';
        case 'LineHeight':
            return 'double';
        case 'FontFamily':
            return 'String';
        case 'FontWeight':
            return 'FontWeight';    
        case 'LetterSpacing':
            return "double"    
        case 'TextDecoration':
            return "TextDecoration"
        case 'Typography':
            return 'AppTypography';
        case 'Composition':
            return 'AppComposition';
        case "Gradient":
            return 'LinearGradient';
        case 'BorderRadius':
            return 'BorderRadius';
        case 'BoxShadow':
            return 'List<BoxShadow>';  
        default:
            return 'Object';
    }
}

module.exports = {
    toDartValue,
}