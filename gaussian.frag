#version 150 core
#extension GL_ARB_explicit_attrib_location: enable

// 5x5 ガウシアンフィルタ

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

void main(void)
{
  fc = (
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2, -2)) * 0.00390625
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -2)) * 0.015625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -2)) * 0.0234375
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -2)) * 0.015625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2, -2)) * 0.00390625
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2, -1)) * 0.015625
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1)) * 0.0625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1)) * 0.09375
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1)) * 0.0625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2, -1)) * 0.015625
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  0)) * 0.0234375
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0)) * 0.09375
        + texture(color, gl_FragCoord.xy) * 0.140625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0)) * 0.09375
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  0)) * 0.0234375
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  1)) * 0.015625
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1)) * 0.0625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1)) * 0.09375
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1)) * 0.0625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  1)) * 0.015625
        
        + textureOffset(color, gl_FragCoord.xy, ivec2(-2,  2)) * 0.00390625
        + textureOffset(color, gl_FragCoord.xy, ivec2(-1,  2)) * 0.015625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 0,  2)) * 0.0234375
        + textureOffset(color, gl_FragCoord.xy, ivec2( 1,  2)) * 0.015625
        + textureOffset(color, gl_FragCoord.xy, ivec2( 2,  2)) * 0.00390625
        
        );
}
