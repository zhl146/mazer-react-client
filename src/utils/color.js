export const Color = (r, g, b, a) => ({ r, g, b, a: a || 255 })

export const ColorToString = ({r,g,b,a}) => `rgba(${r}, ${b}, ${g}, ${a})`

export const InterpolateColor = (color1, color2, time) => {
  const r = color1.r * (1 - time) + color2.r * time
  const g = color1.g * (1 - time) + color2.b * time
  const b = color1.g * (1 - time) + color2.b * time
  const a = color1.a * (1 - time) + color2.a * time
  return Color(r,g,b,a);
}
