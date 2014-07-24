#version 330

// 7x7 à⁄ìÆïΩãœÉtÉBÉãÉ^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// ïΩãœÇãÅÇﬂÇÈ
void main(void)
{
  vec4 sum = texture(image, gl_FragCoord.xy);

  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-3, -3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-2, -3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 2, -3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 3, -3));
        
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-3, -2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 3, -2));
        
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-3, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 3, -1));
        
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  0));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  0));
        
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  1));
        
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  2));
        
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  3));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  3));

  fc = sum * 0.020408163;
}
