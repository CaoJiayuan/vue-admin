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
      \App\User::create([
        'name' => '张三',
        'email' => '1@q.com',
        'password' => bcrypt(123456),
      ]);
    }
}
