<?php
/**
 * Created by PhpStorm.
 * User: caojiayuan
 * Date: 2017/11/16
 * Time: 下午9:07
 */

namespace App\Http\Controllers\Api;


use App\User;
use CaoJiayuan\LaravelApi\Routing\ApiController;
use Illuminate\Http\Request;

class HomeController extends ApiController
{
  public function navigation()
  {
    return config('permissions');
  }

  public function users(Request $request)
  {
    return User::paginate($request->get('per_page'));
  }
}