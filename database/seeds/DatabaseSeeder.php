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
    \App\User::create([
      'name'     => '张三',
      'email'    => '1@q.com',
      'avatar'   => $fa->imageUrl(512, 512),
      'password' => bcrypt(123456),
    ]);
  }
}
