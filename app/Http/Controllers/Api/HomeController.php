<?php
/**
 * Created by PhpStorm.
 * User: caojiayuan
 * Date: 2017/11/16
 * Time: 下午9:07
 */

namespace App\Http\Controllers\Api;


use App\Http\Repository\Repository;
use App\User;
use CaoJiayuan\LaravelApi\Pagination\PageHelper;
use CaoJiayuan\LaravelApi\Routing\ApiController;
use Illuminate\Http\Request;

class HomeController extends ApiController
{
  use PageHelper;

  public function navigation()
  {
    return config('permissions');
  }

  public function users(Request $request, Repository $repository)
  {

    return $repository->getSearchAbleData(User::class, ['name']);
    $query = User::query();

    return $this->applyPaginate($query, $request->get('per_page'));
  }
}