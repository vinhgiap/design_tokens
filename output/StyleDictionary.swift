
//
// StyleDictionary.swift
//

// Do not edit directly
// Generated on Wed, 27 Sep 2023 03:16:57 GMT


import SwiftUI

public class StyleDictionaryClass {
    public static let globalBold = UIFont.Weight.bold
    public static let globalBorderWidthLg = 4
    public static let globalBorderWidthMd = 2
    public static let globalBorderWidthSm = 1
    public static let globalColorAlertBg = UIColor(rgb: 0xFF4A4A)
    public static let globalColorAlertIcon = UIColor(rgb: 0xFF4A4A)
    public static let globalColorBg = UIColor(rgb: 0xFFFFFF)
    public static let globalColorLabelPrimary = UIColor(rgb: 0x2F2F2F)
    public static let globalColorLabelSecondary = UIColor(rgb: 0x2F2F2F)
    public static let globalColorLabelSubtitle = UIColor(rgb: 0x2F2F2F)
    public static let globalColorPrimary = UIColor(rgb: 0x0C6DFF)
    public static let globalColorShadowBlue = UIColor(rgb: 0x0C6DFF)
    public static let globalColorShadowGray = UIColor(rgb: 0x000000)
    public static let globalColorStroke = UIColor(rgb: 0xD1D1D1)
    public static let globalCornerRadiusLg = CGFloat(30)
    public static let globalCornerRadiusMd = CGFloat(24)
    public static let globalCornerRadiusSm = CGFloat(20)
    public static let globalFontSizeLg = 18
    public static let globalFontSizeMd = 16
    public static let globalFontSizeSm = 14
    public static let globalInter = "Inter"
    public static let globalLabel = TokenTypo(
        fontFamily: "Inter-Bold",
        fontWeight: UIFont.Weight.bold,
        fontSize: 16
      )
    public static let globalRegular = UIFont.Weight.regular
    public static let globalShadowBlue = TokenShadow(
      offset: CGSize(width: 0, height: 4),
      blur: 16,
      color: UIColor(rgb: 0x0C6DFF),
      shadowOpactity: 0.25
    )
    public static let globalShadowGray = TokenShadow(
      offset: CGSize(width: 0, height: 4),
      blur: 16,
      color: UIColor(rgb: 0x000000),
      shadowOpactity: 0.25
    )
    public static let globalStroke = TokenBorder(
      borderColor: UIColor(rgb: 0xD1D1D1),
      borderWidth: 1
    )
    public static let globalTextfield = TokenTypo(
        fontFamily: "Inter-Regular",
        fontWeight: UIFont.Weight.regular,
        fontSize: 18
      )
}
