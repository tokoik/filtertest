#version 330

// 5x5 ガウシアンフィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 分散
const float variance = 1.0;

// 重み付き画素値の合計と重みの合計を求める
void f(inout vec4 csum, inout vec4 wsum, const in vec4 c, const in ivec2 o)
{
  float w = exp(-0.5 * dot(o, o) / variance);
  csum += c * w;
  wsum += w;
}

// 平均を求める
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 wsum = vec4(1.0);
  
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2)), ivec2(-2, -2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2)), ivec2(-1, -2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2)), ivec2( 0, -2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2)), ivec2( 1, -2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2)), ivec2( 2, -2));
        
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1)), ivec2(-2, -1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)), ivec2(-1, -1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)), ivec2( 0, -1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)), ivec2( 1, -1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1)), ivec2( 2, -1));
        
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0)), ivec2(-2,  0));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)), ivec2(-1,  0));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)), ivec2( 1,  0));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0)), ivec2( 2,  0));
        
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1)), ivec2(-2,  1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)), ivec2(-1,  1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)), ivec2( 0,  1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)), ivec2( 1,  1));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1)), ivec2( 2,  1));
        
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2)), ivec2(-2,  2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2)), ivec2(-1,  2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2)), ivec2( 0,  2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2)), ivec2( 1,  2));
  f(csum, wsum, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2)), ivec2( 2,  2));

  fc = csum / wsum;
}
