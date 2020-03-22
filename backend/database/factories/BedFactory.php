<?php

/** @var Factory $factory */

use App\Models\Bed;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Bed::class, function (Faker $faker) {
    return [
        'temp' => $faker->randomFloat(2, 18, 27),
        'pressure' => $faker->randomFloat(2, 1000, 2000),
        'station' => $faker->word,
        'room' => $faker->numberBetween(0, 100),
        'floor' => $faker->randomDigit,
        'position' => $faker->randomDigit,
        'has_ecmo' => $faker->boolean(10),
        'is_high_care' => $faker->boolean(15),
        'is_available' => $faker->boolean(50),
        'is_reserved' => $faker->boolean(10),
        'status_updated_at' => $faker->dateTimeThisMonth(),
    ];
});
