#include <iostream>
#include <cstdlib>
#include <opencv2/highgui/highgui.hpp>
#ifdef _WIN32
#  define CV_VERSION_STR CVAUX_STR(CV_MAJOR_VERSION) CVAUX_STR(CV_MINOR_VERSION) CVAUX_STR(CV_SUBMINOR_VERSION)
#  ifdef _DEBUG
#    define CV_EXT_STR "d.lib"
#  else
#    define CV_EXT_STR ".lib"
#  endif
#  pragma comment(lib, "opencv_core" CV_VERSION_STR CV_EXT_STR)
#  pragma comment(lib, "opencv_highgui" CV_VERSION_STR CV_EXT_STR)
#endif

#define BENCHMARK 0

// 補助プログラム
#include "gg.h"
using namespace gg;

//
// ウィンドウ関連の処理
//
class Window
{
  // ウィンドウの識別子
  GLFWwindow *const window;

  // 透視投影変換行列
  GgMatrix mp;
  
  // タイプしたキー
  int key;
  
public:

  // コンストラクタ
  Window(const char *title = "Game Graphics", int width = 640, int height = 480)
    : window(glfwCreateWindow(width, height, title, NULL, NULL)), key(0)
  {
    if (window == NULL)
    {
      // ウィンドウが作成できなかった
      std::cerr << "Can't create GLFW window." << std::endl;
      exit(1);
    }

    // 現在のウィンドウを処理対象にする
    glfwMakeContextCurrent(window);

    // 作成したウィンドウに対する設定
    glfwSwapInterval(1);

    // ゲームグラフィックス特論の都合にもとづく初期化
    ggInit();

    // このインスタンスの this ポインタを記録しておく
    glfwSetWindowUserPointer(window, this);

    // キーボード操作時に呼び出す処理の登録
    glfwSetKeyCallback(window, keyboard);
    
    // ウィンドウのサイズ変更時に呼び出す処理を登録する
    glfwSetFramebufferSizeCallback(window, resize);
    
    // ウィンドウの設定を初期化する
    resize(window, width, height);
  }

  // デストラクタ
  virtual ~Window()
  {
    glfwDestroyWindow(window);
  }

  // ウィンドウを閉じるべきかを判定する
  int shouldClose() const
  {
    return glfwWindowShouldClose(window) | glfwGetKey(window, GLFW_KEY_ESCAPE);
  }

  // カラーバッファを入れ替えてイベントを取り出す
  void swapBuffers()
  {
    // カラーバッファを入れ替える
    glfwSwapBuffers(window);

    // OpenGL のエラーをチェックする
    ggError("SwapBuffers");

    // イベントを取り出す
    glfwPollEvents();
  }

  // キーボード操作時の処理
  static void keyboard(GLFWwindow *window, int key, int scancode, int action, int mods)
  {
    if ((key -= GLFW_KEY_0) >= 0 && key <= 9 && action == GLFW_PRESS)
    {
      // このインスタンスの this ポインタを得る
      Window *const instance(static_cast<Window *>(glfwGetWindowUserPointer(window)));
      
      if (instance != NULL)
      {
        instance->key = key;
      }
    }
  }
  
  // ウィンドウのサイズ変更時の処理
  static void resize(GLFWwindow *window, int width, int height)
  {
    // ウィンドウ全体をビューポートにする
    glViewport(0, 0, width, height);
    
    // このインスタンスの this ポインタを得る
    Window *const instance(static_cast<Window *>(glfwGetWindowUserPointer(window)));
    
    if (instance != NULL)
    {
      // 透視投影変換行列を求める（アスペクト比 w / h）
      instance->mp.loadPerspective(0.5f, (float)width / (float)height, 1.0f, 20.0f);
    }
  }
  
  // 投影変換行列を取り出す
  const GgMatrix &getMp() const
  {
    return mp;
  }
  
  // キーを取り出す
  int getKey() const
  {
    return key;
  }
};

//
// プログラム終了時の処理
//
static void cleanup()
{
  // GLFW の終了処理
  glfwTerminate();
}

//
// メインプログラム
//
int main()
{
  // OpenCV によるビデオキャプチャを初期化する
  cv::VideoCapture camera(CV_CAP_ANY);
  if (!camera.isOpened())
  {
    std::cerr << "cannot open input" << std::endl;
    exit(1);
  }
  
  // カメラの初期設定
  camera.grab();
  const GLsizei capture_width(static_cast<GLsizei>(camera.get(CV_CAP_PROP_FRAME_WIDTH)));
  const GLsizei capture_height(static_cast<GLsizei>(camera.get(CV_CAP_PROP_FRAME_HEIGHT)));
  
  // GLFW を初期化する
  if (glfwInit() == GL_FALSE)
  {
    // 初期化に失敗した
    std::cerr << "Can't initialize GLFW" << std::endl;
    return 1;
  }

  // プログラム終了時の処理を登録する
  atexit(cleanup);

  // OpenGL Version 3.2 Core Profile を選択する
  glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
  glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
  glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
  glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

  // ウィンドウを作成する
  Window window("Filter Test", capture_width, capture_height);

  // 背景色を指定する
  glClearColor(1.0f, 1.0f, 1.0f, 0.0f);
  
  // 頂点配列オブジェクト
  GLuint vao;
  glGenVertexArrays(1, &vao);
  glBindVertexArray(vao);
  
  // 頂点バッファオブジェクト
  GLuint vbo;
  glGenBuffers(1, &vbo);
  glBindBuffer(GL_ARRAY_BUFFER, vbo);
  
  // 図形の読み込み
  static const GLfloat position[][2] =
  {
    { -1.0f, -1.0f },
    {  1.0f, -1.0f },
    {  1.0f,  1.0f },
    { -1.0f,  1.0f }
  };
  static const int vertices(sizeof position / sizeof position[0]);
  glBufferData(GL_ARRAY_BUFFER, sizeof position, position, GL_STATIC_DRAW);
  glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 0, 0);
  glEnableVertexAttribArray(0);
  
  // テクスチャを準備する
  GLuint image;
  glGenTextures(1, &image);
  glBindTexture(GL_TEXTURE_RECTANGLE, image);
  glTexImage2D(GL_TEXTURE_RECTANGLE, 0, GL_RGBA, capture_width, capture_height, 0, GL_BGR, GL_UNSIGNED_BYTE, NULL);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_BORDER);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_BORDER);

  // プログラムオブジェクトの作成
  const GLuint program[] =
  {
    ggLoadShader("simple.vert", "canny.frag"),
    ggLoadShader("simple.vert", "mean3.frag"),
    ggLoadShader("simple.vert", "mean5.frag"),
    ggLoadShader("simple.vert", "mean7.frag"),
    ggLoadShader("simple.vert", "trimmean3.frag"),
    ggLoadShader("simple.vert", "trimmean5.frag"),
    ggLoadShader("simple.vert", "trimmean7.frag"),
    ggLoadShader("simple.vert", "median3.frag"),
    ggLoadShader("simple.vert", "gaussian.frag"),
    ggLoadShader("simple.vert", "bilateral.frag"),
  };

  // uniform 変数のインデックスの検索（見つからなければ -1）
  GLuint imageLoc[sizeof program / sizeof program[0]];
  for (unsigned int i = 0; i < sizeof program / sizeof program[0]; ++i)
  {
    imageLoc[i] = glGetUniformLocation(program[i], "image");
  }
  
#if BENCHMARK
  // 時間計測用の Query Object
  GLuint query;
  glGenQueries(1, &query);
#endif

  // ウィンドウが開いている間繰り返す
  while (window.shouldClose() == GL_FALSE)
  {
    glBindTexture(GL_TEXTURE_RECTANGLE, image);

    if (camera.grab())
    {
      // キャプチャ映像から画像を切り出す
      cv::Mat frame;
      camera.retrieve(frame, 3);
      
      // 切り出した画像をテクスチャに転送する
      for (int y = 0; y < frame.rows; ++y)
      {
        glTexSubImage2D(GL_TEXTURE_RECTANGLE, 0, 0, frame.rows - y - 1, frame.cols, 1,
          GL_BGR, GL_UNSIGNED_BYTE, frame.data + frame.step * y);
      }
    }

#if BENCHMARK
    // 時間の計測開始
    glBeginQuery(GL_TIME_ELAPSED, query);
#endif
    
    // シェーダプログラムの使用開始
    glUseProgram(program[window.getKey()]);
    
    // uniform サンプラの指定
    glUniform1i(imageLoc[window.getKey()], 0);
    
    // テクスチャユニットとテクスチャの指定
    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_RECTANGLE, image);
    
    // 描画に使う頂点配列オブジェクトの指定
    glBindVertexArray(vao);
    
    // 図形の描画
    glDrawArrays(GL_TRIANGLE_FAN, 0, vertices);
    
    // 頂点配列オブジェクトの指定解除
    glBindVertexArray(0);
    
    // シェーダプログラムの使用終了
    glUseProgram(0);
    
#if BENCHMARK
    // 時間の計測終了
    glEndQuery(GL_TIME_ELAPSED);
    
    // 経過時間の取得
    GLint done;
    do { glGetQueryObjectiv(query, GL_QUERY_RESULT_AVAILABLE, &done); } while (!done);
    GLuint64 elapsed_time;
    glGetQueryObjectui64v(query, GL_QUERY_RESULT, &elapsed_time);
    std::cout << static_cast<double>(elapsed_time) * 0.000001 << std::endl;
#endif

    // カラーバッファを入れ替えてイベントを取り出す
    window.swapBuffers();
  }
}
