#version 330

// 3x3 ˆÚ“®•½‹ÏƒtƒBƒ‹ƒ^

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

void main(void)
{
  fc = (
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0))
        + texture(color, gl_FragCoord.xy)
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1))
        
        ) * 0.11111111;
}
