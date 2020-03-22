<?php

use App\Models\Bed;
use App\Models\Hospital;
use Illuminate\Database\Seeder;

class BedsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $hospitals = Hospital::all('id');

        factory(Bed::class, 100)->create()->each(function($bed) use($hospitals) {
            $hospital = $hospitals->random();
            $bed->h_id = $hospital->id;
            $bed->save();
        });
    }
}
