#version 330

// 5x5 ガウシアンフィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// オフセット
const ivec2 offset[] = ivec2[](

  ivec2(-2, -2),
  ivec2(-1, -2),
  ivec2( 0, -2),
  ivec2( 1, -2),
  ivec2( 2, -2),
        
  ivec2(-2, -1),
  ivec2(-1, -1),
  ivec2( 0, -1),
  ivec2( 1, -1),
  ivec2( 2, -1),
        
  ivec2(-2,  0),
  ivec2(-1,  0),
  ivec2( 1,  0),
  ivec2( 2,  0),
        
  ivec2(-2,  1),
  ivec2(-1,  1),
  ivec2( 0,  1),
  ivec2( 1,  1),
  ivec2( 2,  1),
        
  ivec2(-2,  2),
  ivec2(-1,  2),
  ivec2( 0,  2),
  ivec2( 1,  2),
  ivec2( 2,  2)

);

// 分散
const float variance = 1.0;

// 平均を求める
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 wsum = vec4(1.0);
  
  for (int i = 0; i < offset.length(); ++i)
  {
    float o = vec2(offset[i]);
    float w = exp(-0.5 * dot(o, o) / variance);
    wsum += w;
    csum += textureOffset(image, gl_FragCoord.xy, offset[i]) * w;
  }

  fc = csum / wsum;
}
