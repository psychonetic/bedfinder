<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Query\Builder;

class Bed extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'temp',
        'pressure',
        'station',
        'room',
        'floor',
        'position',
        'has_ecmo',
        'is_high_care',
        'is_available',
        'is_reserved',
        'reserved_until',
    ];

    /***
     * The attributes that are dates.
     */
    protected $dates = ['status_updated_at', 'reserved_until'];

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
        'temp' => 'decimal:4',
        'pressure' => 'decimal:8',
        'station' => 'string',
        'room' => 'string',
        'floor' => 'string',
        'position' => 'string',
        'has_ecmo' => 'boolean',
        'is_high_care' => 'boolean',
        'is_available' => 'boolean',
        'is_reserved' => 'boolean',
    ];

    /**
     * Return the hospital.
     *
     * @return HasOne
     */
    public function hospital()
    {
        return $this->hasOne(Hospital::class, 'id', 'h_id');
    }

    /**
     * @param $query
     * @param int $hospital
     * @return Builder
     */
    public function scopeAggregate($query, int $hospital)
    {
        return $query->selectRaw('is_high_care, has_ecmo, is_available, count(*) as count')
            ->where('h_id', $hospital)
            ->groupBy('is_high_care', 'has_ecmo', 'is_available');
    }

    /**
     * @param $query
     * @param int $hospital
     * @param bool $isHighCare
     * @param bool $withEcmo
     * @return Builder
     */
    public function scopeFindAvailableBy($query, int $hospital,  bool $isHighCare, bool $withEcmo)
    {
        return $query->where('h_id', $hospital)
            ->where('is_available', true)
            ->where('is_high_care', $isHighCare)
            ->where('has_ecmo', $withEcmo);
    }

    /**
     * @param $query
     * @param int $hospital
     * @param bool $isHighCare
     * @param bool $withEcmo
     * @return Builder
     */
    public function scopeFindBlockedBy($query, int $hospital,  bool $isHighCare, bool $withEcmo)
    {
        return $query->where('h_id', $hospital)
            ->where('is_available', false)
            ->where('is_high_care', $isHighCare)
            ->where('has_ecmo', $withEcmo);
    }
}
