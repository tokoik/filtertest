#version 330

// 3x3 移動平均フィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// オフセット
const ivec2 offset[] = ivec2[](

  ivec2(-1, -1),
  ivec2( 0, -1),
  ivec2( 1, -1),

  ivec2(-1,  0),
  ivec2( 1,  0),

  ivec2(-1,  1),
  ivec2( 0,  1),
  ivec2( 1,  1)

);

// 平均を求める
void main(void)
{
  vec4 sum = texture(image, gl_FragCoord.xy);

  for (int i = 0; i < offset.length(); ++i)
    sum += textureOffset(image, gl_FragCoord.xy, offset[i]);

  fc = sum / (offset.length() + 1);
}
