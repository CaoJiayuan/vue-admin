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
use Illuminate\Http\Request;

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
    $credentials = $request->only('email', 'password');

    if ($token = $this->guard()->attempt($credentials)) {
      return $this->respondWithToken($token);
    }

    return $this->respondMessage(401, __('auth.failed'));
  }

  /**
   * Get the guard to be used during authentication.
   *
   * @return \Illuminate\Contracts\Auth\Guard
   */
  public function guard()
  {
    return Auth::guard('jwt');
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