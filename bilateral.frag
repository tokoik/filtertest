#version 330

// 5x5 バイラテラルフィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 分散
const float variance1 = 1.0;
const float variance2 = 100.0;

// 重み付き画素値と重みの合計を求める
vec4 f(inout vec4 wsum, const in vec4 base, const in ivec2 o)
{
  vec2 x = vec2(o);
  float w = exp(-0.5 * dot(x, x) / variance1);
  vec4 c = textureOffset(dmap, gl_FragCoord.xy, o);
  vec4 d = c - base;
  vec4 e = exp(-0.5 * d * d / variance2) * w;
  wsum += e;
  return c * e;
}

// 平均を求める
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 wsum = vec4(1.0);
  vec4 base = csum;
  
  csum += f(wsum, base, ivec2(-2, -2));
  csum += f(wsum, base, ivec2(-1, -2));
  csum += f(wsum, base, ivec2( 0, -2));
  csum += f(wsum, base, ivec2( 1, -2));
  csum += f(wsum, base, ivec2( 2, -2));
        
  csum += f(wsum, base, ivec2(-2, -1));
  csum += f(wsum, base, ivec2(-1, -1));
  csum += f(wsum, base, ivec2( 0, -1));
  csum += f(wsum, base, ivec2( 1, -1));
  csum += f(wsum, base, ivec2( 2, -1));
        
  csum += f(wsum, base, ivec2(-2,  0));
  csum += f(wsum, base, ivec2(-1,  0));
  csum += f(wsum, base, ivec2( 1,  0));
  csum += f(wsum, base, ivec2( 2,  0));
        
  csum += f(wsum, base, ivec2(-2,  1));
  csum += f(wsum, base, ivec2(-1,  1));
  csum += f(wsum, base, ivec2( 0,  1));
  csum += f(wsum, base, ivec2( 1,  1));
  csum += f(wsum, base, ivec2( 2,  1));
        
  csum += f(wsum, base, ivec2(-2,  2));
  csum += f(wsum, base, ivec2(-1,  2));
  csum += f(wsum, base, ivec2( 0,  2));
  csum += f(wsum, base, ivec2( 1,  2));
  csum += f(wsum, base, ivec2( 2,  2));

  fc = csum / wsum;
}
