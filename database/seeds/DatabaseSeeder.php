<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	DB::table('tbl_admin')->insert([
    		'tentaikhoan' =>'admin',
            'email' => 'admin@gmail.com',
    		'password' => bcrypt('123456'),
            'matruong' => '1',
            'mahuyen' => '1',
            'loaixa' => '1',
            'level' => '1',
    	]);
     //   $this->call(RoleTableSeeder::class);
     // // User seeder will use the roles above created.
     //   $this->call(UserTableSeeder::class);
   }
}
