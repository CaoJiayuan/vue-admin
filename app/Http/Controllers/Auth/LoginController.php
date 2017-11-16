<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
  /*
  |--------------------------------------------------------------------------
  | Login Controller
  |--------------------------------------------------------------------------
  |
  | This controller handles authenticating users for the application and
  | redirecting them to your home screen. The controller uses a trait
  | to conveniently provide its functionality to your applications.
  |
  */

  use AuthenticatesUsers;

  /**
   * Where to redirect users after login.
   *
   * @var string
   */
  protected $redirectTo = '/home';

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('guest')->except('logout');
  }

  public function showLoginForm()
  {
    return view('login');
  }

  protected function sendLoginResponse(Request $request)
  {
    return $this->authenticated($request, $this->guard()->user());
  }

  /**
   * The user has been authenticated.
   *
   * @param  Request  $request
   * @param  mixed  $user
   * @return mixed
   */
  protected function authenticated(Request $request, $user)
  {
    $user->token = $this->getJWTToken($request, $user);

    return $user;
  }

  protected function getJWTToken(Request $request, $user)
  {
    return JWTAuth::fromUser($user, $this->getCustomClaims($request, $user));
  }

  protected function getCustomClaims(Request $request, $user)
  {
    return [];
  }

}
