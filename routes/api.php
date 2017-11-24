<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'web'], function () {
  Route::post('login', 'Auth\LoginController@login');
  Route::post('logout', 'Auth\LoginController@logout')->name('logout');

  Route::group(['middleware' => 'auth:jwt,web', 'namespace' => 'Api'], function () {
    Route::post('refresh', 'AuthController@refresh');
    Route::get('user', 'AuthController@user');
    Route::get('/navigation', 'HomeController@navigation');
    Route::get('test', function (Request $request) {
      return $request->session()->getId();
    });
  });
});

