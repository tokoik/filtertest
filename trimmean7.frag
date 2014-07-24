#version 330

// 3x3 の最大値と最小値を除いた移動平均フィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 画素値とその最大値・最小値を求める
vec4 f(inout vec4 cmin, inout vec4 cmax, const in ivec2 o)
{
  vec4 c = textureOffset(dmap, gl_FragCoord.xy, o);
  cmax = max(c, cmax);
  cmin = min(c, cmin);
  return c;
}

// 最大値と最小値を含まない平均を求める
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 cmin = csum;
  vec4 cmax = csum;

  csum += f(cmin, cmax, ivec2(-3, -3));
  csum += f(cmin, cmax, ivec2(-2, -3));
  csum += f(cmin, cmax, ivec2(-1, -3));
  csum += f(cmin, cmax, ivec2( 0, -3));
  csum += f(cmin, cmax, ivec2( 1, -3));
  csum += f(cmin, cmax, ivec2( 2, -3));
  csum += f(cmin, cmax, ivec2( 3, -3));
        
  csum += f(cmin, cmax, ivec2(-3, -2));
  csum += f(cmin, cmax, ivec2(-2, -2));
  csum += f(cmin, cmax, ivec2(-1, -2));
  csum += f(cmin, cmax, ivec2( 0, -2));
  csum += f(cmin, cmax, ivec2( 1, -2));
  csum += f(cmin, cmax, ivec2( 2, -2));
  csum += f(cmin, cmax, ivec2( 3, -2));
        
  csum += f(cmin, cmax, ivec2(-3, -1));
  csum += f(cmin, cmax, ivec2(-2, -1));
  csum += f(cmin, cmax, ivec2(-1, -1));
  csum += f(cmin, cmax, ivec2( 0, -1));
  csum += f(cmin, cmax, ivec2( 1, -1));
  csum += f(cmin, cmax, ivec2( 2, -1));
  csum += f(cmin, cmax, ivec2( 3, -1));
        
  csum += f(cmin, cmax, ivec2(-3,  0));
  csum += f(cmin, cmax, ivec2(-2,  0));
  csum += f(cmin, cmax, ivec2(-1,  0));
  csum += f(cmin, cmax, ivec2( 1,  0));
  csum += f(cmin, cmax, ivec2( 2,  0));
  csum += f(cmin, cmax, ivec2( 3,  0));
        
  csum += f(cmin, cmax, ivec2(-3,  1));
  csum += f(cmin, cmax, ivec2(-2,  1));
  csum += f(cmin, cmax, ivec2(-1,  1));
  csum += f(cmin, cmax, ivec2( 0,  1));
  csum += f(cmin, cmax, ivec2( 1,  1));
  csum += f(cmin, cmax, ivec2( 2,  1));
  csum += f(cmin, cmax, ivec2( 3,  1));
        
  csum += f(cmin, cmax, ivec2(-3,  2));
  csum += f(cmin, cmax, ivec2(-2,  2));
  csum += f(cmin, cmax, ivec2(-1,  2));
  csum += f(cmin, cmax, ivec2( 0,  2));
  csum += f(cmin, cmax, ivec2( 1,  2));
  csum += f(cmin, cmax, ivec2( 2,  2));
  csum += f(cmin, cmax, ivec2( 3,  2));
        
  csum += f(cmin, cmax, ivec2(-3,  3));
  csum += f(cmin, cmax, ivec2(-2,  3));
  csum += f(cmin, cmax, ivec2(-1,  3));
  csum += f(cmin, cmax, ivec2( 0,  3));
  csum += f(cmin, cmax, ivec2( 1,  3));
  csum += f(cmin, cmax, ivec2( 2,  3));
  csum += f(cmin, cmax, ivec2( 3,  3));

  fc = (csum - cmin - cmax) * 0.021276596;
}
