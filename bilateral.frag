#version 330

// 5x5 バイラテラルフィルタ

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

const float sigma = -100.0;

// 重み付き和と重みの合計を求める
void calc(in vec4 c, in vec4 b, in float w, inout vec4 csum, inout vec4 wsum)
{
  vec4 d = c - b;
  vec4 e = exp(d * d * sigma) * w;
  wsum += e;
  csum += c * e;
}

void main(void)
{
  const float w[] = float[](0.140625, 0.09375, 0.0625, 0.0234375, 0.015625, 0.00390625);
  vec4 b = texture(color, gl_FragCoord.xy);
  vec4 wsum = vec4(w[0]);
  vec4 csum = b * wsum;
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2, -2)), b, w[5], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1, -2)), b, w[4], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0, -2)), b, w[3], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1, -2)), b, w[4], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2, -2)), b, w[5], csum, wsum);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2, -1)), b, w[4], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1)), b, w[2], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1)), b, w[1], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1)), b, w[2], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2, -1)), b, w[4], csum, wsum);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2,  0)), b, w[2], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0)), b, w[1], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0)), b, w[1], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2,  0)), b, w[2], csum, wsum);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2,  1)), b, w[4], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1)), b, w[2], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1)), b, w[1], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1)), b, w[2], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2,  1)), b, w[4], csum, wsum);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2,  2)), b, w[5], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  2)), b, w[4], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0,  2)), b, w[3], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  2)), b, w[4], csum, wsum);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2,  2)), b, w[5], csum, wsum);
  
  fc = csum / wsum;
}
