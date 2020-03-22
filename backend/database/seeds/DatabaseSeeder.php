<?php

use App\DiviAdapter;
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
      /*  $this->call(HospitalsTableSeeder::class);
        $this->call(BedsTableSeeder::class);*/
      $this->call(AdminUserSeeder::class);
      $divi = new DiviAdapter();
      $divi->parse('storage/hospital.json')->create();
    }
}
