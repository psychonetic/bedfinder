<?php

/** @var Factory $factory */

use App\Models\Hospital;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Hospital::class, function (Faker $faker) {
    return [
        'phone_1' => $faker->phoneNumber,
        'phone_2' => $faker->phoneNumber,
        'street' => $faker->streetAddress,
        'postal_code' => $faker->postcode,
        'city' => $faker->city,
        'lat' => $faker->latitude,
        'lng' => $faker->longitude,
    ];
});
