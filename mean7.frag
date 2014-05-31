#version 150 core
#extension GL_ARB_explicit_attrib_location: enable

// 7x7 ˆÚ“®•½‹ÏƒtƒBƒ‹ƒ^

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

void main(void)
{
  fc = (
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-3, -3))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2, -3))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2, -3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 3, -3))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-3, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 3, -2))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-3, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 3, -1))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-3,  0))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  0))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0))
        + texture(color, gl_FragCoord.xy)
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  0))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 3,  0))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-3,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 3,  1))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-3,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 3,  2))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-3,  3))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  3))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  3))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 3,  3))
        
        ) * 0.02040816;
}
