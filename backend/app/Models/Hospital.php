<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hospital extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'phone_1',
        'phone_2',
        'street',
        'country',
        'city',
        'postal_code',
        'lat',
        'lng'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'phone_1' => 'string',
        'phone_2' => 'string',
        'phone_3' => 'string',
        'street' => 'string',
        'country' => 'string',
        'postal_code' => 'string',
        'lat' => 'decimal:10',
        'lng' => 'decimal:10',
    ];

    /**
     * Return all beds.
     *
     * @return HasMany
     */
    public function beds()
    {
        return $this->hasMany(Bed::class, 'h_id', 'id');
    }

    /**
     * @param string $postalCode
     * @param string $city
     * @return
     */
    public function scopeFindByPostalAndCity($query, string $postalCode, string $city)
    {
        return $query->where('postal_code', $postalCode)->where('city', $city);
    }

    public function scopeFindWithinDistance($query, float $lat, float $lng, int $distance)
    {
        return $query->select('*')
            ->selectRaw( '6371 * ACOS(
                COS(RADIANS(lat))
              * COS(RADIANS(?))
              * COS(RADIANS(?) - RADIANS(lng))
              + SIN(RADIANS(lat))
              * SIN(RADIANS(?))) as distance'
            , [$lat, $lng, $lat])
        ->havingRaw('6371 * ACOS(
                COS(RADIANS(lat))
              * COS(RADIANS(?))
              * COS(RADIANS(?) - RADIANS(lng))
              + SIN(RADIANS(lat))
              * SIN(RADIANS(?))) <= ?', [$lat, $lng, $lat, $distance])
            ->groupBy('id')
            ->orderBy('distance');

    }
}
