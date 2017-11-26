<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $fa = \Faker\Factory::create();
    DB::table('users')->truncate();
    \App\User::updateOrCreate([
      'email'    => '1@q.com',
    ], [
      'name'     => '张三',
      'avatar'   => $fa->imageUrl(640, 640),
      'password' => bcrypt(123456),
    ]);
    factory(\App\User::class, 100)->create();
  }
}
