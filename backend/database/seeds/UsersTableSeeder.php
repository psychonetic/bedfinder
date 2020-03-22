<?php

use App\Models\Hospital;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $hospitals = Hospital::all('id');

        factory(User::class, 100)->create()->each(function($user) use($hospitals) {
            $hospital = $hospitals->random();
            if ($user->role !== 'medic') {
                $user->h_id = $hospital->id;
                $user->save();
            }
        });

        // admin example user
        factory(User::class)->create([
            'name' => 'brinkmann',
            'password' => bcrypt('password')
        ]);
        
    }
}
