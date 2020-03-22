<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // admin example user
        factory(User::class)->create([
            'name' => 'brinkmann',
            'password' => bcrypt('password')
        ]);
        
    }
}
