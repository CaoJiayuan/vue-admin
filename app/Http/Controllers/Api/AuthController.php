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
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\SessionGuard;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTGuard;

class AuthController extends ApiController
{
  /**
   * Get the authenticated User
   *
   * @return \Illuminate\Http\JsonResponse
   * @throws AuthenticationException
   */
  public function user()
  {
    if ($user = Auth::user()){
      return response()->json($user);
    }

    throw new AuthenticationException('Unauthenticated.');
  }

  /**
   * @return JWTGuard
   */
  public function guard()
  {
    return Auth::guard('jwt');
  }

  public function respondWithToken($token)
  {
    $data = [
      'access_token' => $token,
      'expires_in'   => 8,//$this->guard()->factory()->getTTL() * 60,
      'type'         => 'bearer',
    ];

    return response()->json($data);
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
