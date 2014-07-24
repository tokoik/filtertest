#version 330

// 5x5 ˆÚ“®•½‹ÏƒtƒBƒ‹ƒ^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// •½‹Ï‚ğ‹‚ß‚é
void main(void)
{
  vec4 sum = texture(image, gl_FragCoord.xy);

  sum += textureOffset(image, t, ivec2(-2, -2));
  sum += textureOffset(image, t, ivec2(-1, -2));
  sum += textureOffset(image, t, ivec2( 0, -2));
  sum += textureOffset(image, t, ivec2( 1, -2));
  sum += textureOffset(image, t, ivec2( 2, -2));
        
  sum += textureOffset(image, t, ivec2(-2, -1));
  sum += textureOffset(image, t, ivec2(-1, -1));
  sum += textureOffset(image, t, ivec2( 0, -1));
  sum += textureOffset(image, t, ivec2( 1, -1));
  sum += textureOffset(image, t, ivec2( 2, -1));
        
  sum += textureOffset(image, t, ivec2(-2,  0));
  sum += textureOffset(image, t, ivec2(-1,  0));
  sum += textureOffset(image, t, ivec2( 1,  0));
  sum += textureOffset(image, t, ivec2( 2,  0));
        
  sum += textureOffset(image, t, ivec2(-2,  1));
  sum += textureOffset(image, t, ivec2(-1,  1));
  sum += textureOffset(image, t, ivec2( 0,  1));
  sum += textureOffset(image, t, ivec2( 1,  1));
  sum += textureOffset(image, t, ivec2( 2,  1));
        
  sum += textureOffset(image, t, ivec2(-2,  2));
  sum += textureOffset(image, t, ivec2(-1,  2));
  sum += textureOffset(image, t, ivec2( 0,  2));
  sum += textureOffset(image, t, ivec2( 1,  2));
  sum += textureOffset(image, t, ivec2( 2,  2));

  fc = sum * 0.04;
}
