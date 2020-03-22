<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BedInfoCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  Request
     * @return array
     */
    public function toArray($request)
    {
        $highCareBeds = $this->resource->filter(function($item) {
            return $item->is_high_care === true && $item->is_available === true;
        });
        $lowCareBeds = $this->resource->filter(function($item) {
            return $item->is_high_care === false && $item->is_available === true;
        });
        $ecmoLowCareBeds = $lowCareBeds->filter(function ($item) {
            return $item->has_ecmo === true;
        });
        $ecmoHighCareBeds = $highCareBeds->filter(function ($item) {
            return $item->has_ecmo === true;
        });


        $lowCareBedsCount = $lowCareBeds->sum('count');
        $highCareBedsCount = $highCareBeds->sum('count');
        $ecmoLowCareBedsCount = $ecmoLowCareBeds->sum('count');
        $ecmoHighCareBedsCount = $ecmoHighCareBeds->sum('count');
        $beds = $this->resource->sum('count');

        return [
            'icu_low_care' => $lowCareBedsCount,
            'icu_high_care' => $highCareBedsCount,
            'ecmo_icu_low_care' => $ecmoLowCareBedsCount,
            'ecmo_icu_high_care' => $ecmoHighCareBedsCount,
            'ecmo' => ($ecmoLowCareBedsCount + $ecmoHighCareBedsCount),
            'beds' => $beds
        ];
    }
}
