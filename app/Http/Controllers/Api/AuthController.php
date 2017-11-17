<?php
/**
 * Created by PhpStorm.
 * User: caojiayuan
 * Date: 2017/11/16
 * Time: 下午8:55
 */

namespace App\Http\Controllers\Api;


use Auth;
use CaoJiayuan\LaravelApi\Routing\ApiController;
use Illuminate\Auth\SessionGuard;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTGuard;

class AuthController extends ApiController
{
  /**
   * Create a new AuthController instance.
   *
   */
  public function __construct()
  {
    $this->middleware('auth:jwt', ['except' => ['login']]);
    parent::__construct();
  }

  /**
   * Get a JWT token via given credentials.
   *
   * @param  Request $request
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(Request $request)
  {

    if ($token = $this->attemptLogin($request)) {
      return $this->respondWithToken($token);
    }

    return $this->respondMessage(401, __('auth.failed'));
  }

  public function attemptLogin(Request $request)
  {
    $credentials = $request->only('email', 'password');

    /** @var JWTGuard $jwt */
    $jwt = $this->guard();

    if ($token = $jwt->attempt($credentials)) {
//      $session = $this->guard('web');
//      /** @var SessionGuard $session */
//      $user = $jwt->getLastAttempted();
//      $session->login($user);
//      $request->session()->regenerate();
      return $token;
    }

    return false;
  }

  /**
   * Get the guard to be used during authentication.
   *
   * @param string $name
   * @return \Illuminate\Contracts\Auth\Guard
   */
  public function guard($name = 'jwt')
  {
    return Auth::guard($name);
  }

  /**
   * Get the token array structure.
   *
   * @param  string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  protected function respondWithToken($token)
  {
    return response()->json([
      'access_token' => $token,
      'token_type'   => 'bearer',
      'expires_in'   => $this->guard()->factory()->getTTL() * 60
    ]);
  }

  /**
   * Get the authenticated User
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function user()
  {
    return response()->json($this->guard()->user());
  }

  /**
   * Log the user out (Invalidate the token)
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout()
  {
    $this->guard()->logout();

    return response()->json(['message' => 'Successfully logged out']);
  }

  /**
   * Refresh a token.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function refresh()
  {
    return $this->respondWithToken($this->guard()->refresh());
  }
}
