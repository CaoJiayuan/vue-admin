<?php
/**
 * Created by PhpStorm.
 * User: caojiayuan
 * Date: 2017/11/26
 * Time: 下午3:41
 */

namespace App\Http\Repository;


use CaoJiayuan\LaravelApi\Pagination\PageHelper;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Repository
{
  use PageHelper;

  public function getSearchAbleData($model, array $search = [], \Closure $closure = null, \Closure $trans = null)
  {
    $data = \Request::only([
      'filter', 'sort', 'per_page'
    ]);
    $data = array_merge([
      'filter' => '',
      'sort' => '',
      'per_page' => 15
    ], $data);
    list($filter, $order, $pageSize) = array_values($data);
    if (!is_object($model)) {
      $model = app($model);
    }
    if (!$model instanceof Model) {
      throw new \UnexpectedValueException(__METHOD__ . ' expects parameter 1 to be an object of ' . Model::class . ',' . get_class($model) . ' given');
    }
    $orderArr = explode('|', $order, 2);
    $table = $model->getTable();
    $key = $model->getKeyName();
    list($o, $d) = [array_get($orderArr, 0) ?: $table . '.' . $key, array_get($orderArr, 1) ?: 'desc'];
    $builder = $model->orderBy($o, $d);
    if ($filter && $search) {
      $builder->where(function ($builder) use ($search, $filter, $table) {
        foreach ((array)$search as $column) {
          /** @var Builder $builder */
          $builder->orWhere($table . '.' . $column, 'like binary', "%{$filter}%");
        }
      });
    }
    if ($closure) {
      $closure($builder);
    }
    $pager = $this->applyPaginate($builder, $pageSize);
    if ($trans) {
      $trans($pager->getCollection());
    }

    return $pager;
  }
}