<?php
/**
 * Created by PhpStorm.
 * User: caojiayuan
 * Date: 2017/11/16
 * Time: 下午9:07
 */

namespace App\Http\Controllers\Api;


use CaoJiayuan\LaravelApi\Routing\ApiController;

class HomeController extends ApiController
{
  public function navigation()
  {
    return config('permissions');
  }

}