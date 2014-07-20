#version 330

// 3x3 の最大値と最小値を除いた移動平均フィルタ

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

// 合計と最大値と最小値を求める
void calc(in vec4 c, inout vec4 csum, inout vec4 cmax, inout vec4 cmin)
{
  csum += c;
  cmax = max(c, cmax);
  cmin = min(c, cmin);
}

void main(void)
{
  vec4 csum = texture(color, gl_FragCoord.xy);
  vec4 cmax = csum;
  vec4 cmin = csum;
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-3, -3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2, -3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1, -3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0, -3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1, -3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2, -3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 3, -3)), csum, cmin, cmax);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-3, -2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2, -2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1, -2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0, -2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1, -2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2, -2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 3, -2)), csum, cmin, cmax);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-3, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 3, -1)), csum, cmin, cmax);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-3,  0)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2,  0)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2,  0)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 3,  0)), csum, cmin, cmax);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-3,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 3,  1)), csum, cmin, cmax);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-3,  2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2,  2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0,  2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2,  2)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 3,  2)), csum, cmin, cmax);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-3,  3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-2,  3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0,  3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 2,  3)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 3,  3)), csum, cmin, cmax);
  
  fc = (csum - cmax - cmin) * 0.02127650;
}
