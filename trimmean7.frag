#version 330

// 3x3 の最大値と最小値を除いた移動平均フィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// オフセット
const ivec2 offset[] = ivec2[](
        
  ivec2(-3, -3),
  ivec2(-2, -3),
  ivec2(-1, -3),
  ivec2( 0, -3),
  ivec2( 1, -3),
  ivec2( 2, -3),
  ivec2( 3, -3),
        
  ivec2(-3, -2),
  ivec2(-2, -2),
  ivec2(-1, -2),
  ivec2( 0, -2),
  ivec2( 1, -2),
  ivec2( 2, -2),
  ivec2( 3, -2),
        
  ivec2(-3, -1),
  ivec2(-2, -1),
  ivec2(-1, -1),
  ivec2( 0, -1),
  ivec2( 1, -1),
  ivec2( 2, -1),
  ivec2( 3, -1),
        
  ivec2(-3,  0),
  ivec2(-2,  0),
  ivec2(-1,  0),
  ivec2( 1,  0),
  ivec2( 2,  0),
  ivec2( 3,  0),
        
  ivec2(-3,  1),
  ivec2(-2,  1),
  ivec2(-1,  1),
  ivec2( 0,  1),
  ivec2( 1,  1),
  ivec2( 2,  1),
  ivec2( 3,  1),
        
  ivec2(-3,  2),
  ivec2(-2,  2),
  ivec2(-1,  2),
  ivec2( 0,  2),
  ivec2( 1,  2),
  ivec2( 2,  2),
  ivec2( 3,  2),
        
  ivec2(-3,  3),
  ivec2(-2,  3),
  ivec2(-1,  3),
  ivec2( 0,  3),
  ivec2( 1,  3),
  ivec2( 2,  3),
  ivec2( 3,  3)

);


// 最大値と最小値を含まない平均を求める
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 cmax = csum;
  vec4 cmin = csum;

  for (int i = 0; i < offset.length(); ++i)
  {
    vec4 c = textureOffset(image, gl_FragCoord.xy, offset[i]);
    csum += c;
    cmax = max(c, cmax);
    cmin = min(c, cmin);
  }

  fc = (csum - cmax - cmin) / (offset.length() - 1);
}
