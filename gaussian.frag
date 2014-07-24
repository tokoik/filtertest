#version 330

// 5x5 ガウシアンフィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 分散
const float variance = 1.0;

// 重み付き画素値と重みの合計を求める
vec4 f(inout vec4 wsum, const in ivec2 o)
{
  vec2 x = vec2(o);
  float w = exp(-0.5 * dot(x, x) / variance);
  wsum += w;
  return textureOffset(image, gl_FragCoord.xy, o) * w;
}

// 分散
const float variance = 1.0;

// 平均を求める
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 wsum = vec4(1.0);
  
  csum += f(wsum, ivec2(-2, -2));
  csum += f(wsum, ivec2(-1, -2));
  csum += f(wsum, ivec2( 0, -2));
  csum += f(wsum, ivec2( 1, -2));
  csum += f(wsum, ivec2( 2, -2));
        
  csum += f(wsum, ivec2(-2, -1));
  csum += f(wsum, ivec2(-1, -1));
  csum += f(wsum, ivec2( 0, -1));
  csum += f(wsum, ivec2( 1, -1));
  csum += f(wsum, ivec2( 2, -1));
        
  csum += f(wsum, ivec2(-2,  0));
  csum += f(wsum, ivec2(-1,  0));
  csum += f(wsum, ivec2( 1,  0));
  csum += f(wsum, ivec2( 2,  0));
        
  csum += f(wsum, ivec2(-2,  1));
  csum += f(wsum, ivec2(-1,  1));
  csum += f(wsum, ivec2( 0,  1));
  csum += f(wsum, ivec2( 1,  1));
  csum += f(wsum, ivec2( 2,  1));
        
  csum += f(wsum, ivec2(-2,  2));
  csum += f(wsum, ivec2(-1,  2));
  csum += f(wsum, ivec2( 0,  2));
  csum += f(wsum, ivec2( 1,  2));
  csum += f(wsum, ivec2( 2,  2));

  fc = csum / wsum;
}
