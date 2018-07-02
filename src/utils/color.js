import { Interpolate } from "./interpolate"

export const Color = (r, g, b, a) => ({ r, g, b, a: a || 255 })

export const ColorToString = ({r,g,b,a}) => `rgba(${r}, ${b}, ${g}, ${a})`

export const InterpolateColor = (color1, color2, time) => {
  const r = Interpolate(color1.r, color2.r, time)
  const g = Interpolate(color1.g, color2.g, time)
  const b = Interpolate(color1.b, color2.b, time)
  const a = Interpolate(color1.a, color2.a, time)
  return Color(r,g,b,a);
}
