#version 150 core
#extension GL_ARB_explicit_attrib_location: enable

// 5x5 バイラテラルフィルタ

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

const float sigma = -100.0;

void main(void)
{
  vec4 c[] = vec4[](
                    
                    textureOffset(color, gl_FragCoord.xy, ivec2(-2, -2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2(-1, -2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 0, -2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 1, -2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 2, -2)),
                    
                    textureOffset(color, gl_FragCoord.xy, ivec2(-2, -1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 2, -1)),
                    
                    textureOffset(color, gl_FragCoord.xy, ivec2(-2,  0)),
                    textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0)),
                    texture(color, gl_FragCoord.xy),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 2,  0)),
                    
                    textureOffset(color, gl_FragCoord.xy, ivec2(-2,  1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 2,  1)),
                    
                    textureOffset(color, gl_FragCoord.xy, ivec2(-2,  2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2(-1,  2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 0,  2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 1,  2)),
                    textureOffset(color, gl_FragCoord.xy, ivec2( 2,  2))
                    
                    );
  
  vec4 w[] = vec4[](

                    exp((c[12] - c[ 0]) * (c[12] - c[ 0]) * sigma) * 0.00390625,
                    exp((c[12] - c[ 1]) * (c[12] - c[ 1]) * sigma) * 0.015625,
                    exp((c[12] - c[ 2]) * (c[12] - c[ 2]) * sigma) * 0.0234375,
                    exp((c[12] - c[ 3]) * (c[12] - c[ 3]) * sigma) * 0.015625,
                    exp((c[12] - c[ 4]) * (c[12] - c[ 4]) * sigma) * 0.00390625,
        
                    exp((c[12] - c[ 5]) * (c[12] - c[ 5]) * sigma) * 0.015625,
                    exp((c[12] - c[ 6]) * (c[12] - c[ 6]) * sigma) * 0.0625,
                    exp((c[12] - c[ 7]) * (c[12] - c[ 7]) * sigma) * 0.09375,
                    exp((c[12] - c[ 8]) * (c[12] - c[ 8]) * sigma) * 0.0625,
                    exp((c[12] - c[ 9]) * (c[12] - c[ 9]) * sigma) * 0.015625,
        
                    exp((c[12] - c[10]) * (c[12] - c[10]) * sigma) * 0.0234375,
                    exp((c[12] - c[11]) * (c[12] - c[11]) * sigma) * 0.09375,
                    vec4(0.140625),
                    exp((c[12] - c[13]) * (c[12] - c[13]) * sigma) * 0.09375,
                    exp((c[12] - c[14]) * (c[12] - c[14]) * sigma) * 0.0234375,
        
                    exp((c[12] - c[15]) * (c[12] - c[15]) * sigma) * 0.015625,
                    exp((c[12] - c[16]) * (c[12] - c[16]) * sigma) * 0.0625,
                    exp((c[12] - c[17]) * (c[12] - c[17]) * sigma) * 0.09375,
                    exp((c[12] - c[18]) * (c[12] - c[18]) * sigma) * 0.0625,
                    exp((c[12] - c[19]) * (c[12] - c[19]) * sigma) * 0.015625,
        
                    exp((c[12] - c[20]) * (c[12] - c[20]) * sigma) * 0.00390625,
                    exp((c[12] - c[21]) * (c[12] - c[21]) * sigma) * 0.015625,
                    exp((c[12] - c[22]) * (c[12] - c[22]) * sigma) * 0.0234375,
                    exp((c[12] - c[23]) * (c[12] - c[23]) * sigma) * 0.015625,
                    exp((c[12] - c[24]) * (c[12] - c[24]) * sigma) * 0.00390625
        
        );

  vec4 sum
  = w[ 0] + w[ 1] + w[ 2] + w[ 3] + w[ 4] + w[ 5] + w[ 6] + w[ 7] + w[ 8] + w[ 9]
  + w[10] + w[11] + w[12] + w[13] + w[14] + w[15] + w[16] + w[17] + w[18] + w[19]
  + w[20] + w[21] + w[22] + w[23] + w[24];
  
  vec4 ret
  = c[ 0] * w[ 0] + c[ 1] * w[ 1] + c[ 2] * w[ 2] + c[ 3] * w[ 3] + c[ 4] * w[ 4]
  + c[ 5] * w[ 5] + c[ 6] * w[ 6] + c[ 7] * w[ 7] + c[ 8] * w[ 8] + c[ 9] * w[ 9]
  + c[10] * w[10] + c[11] * w[11] + c[12] * w[12] + c[13] * w[13] + c[14] * w[14]
  + c[15] * w[15] + c[16] * w[16] + c[17] * w[17] + c[18] * w[18] + c[19] * w[19]
  + c[20] * w[20] + c[21] * w[21] + c[22] * w[22] + c[23] * w[23] + c[24] * w[24];
  
  fc = ret / sum;
}
