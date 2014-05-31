#version 150 core
#extension GL_ARB_explicit_attrib_location: enable

// 5x5 移動平均フィルタ

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

void main(void)
{
  fc = (
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2, -2))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2, -1))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  0))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0))
        + texture(color, gl_FragCoord.xy)
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  0))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  1))
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  2))
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  2))
        
        ) * 0.04;
}
