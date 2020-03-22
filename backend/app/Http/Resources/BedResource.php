<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\Resource;

class BedResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'h_id' => $this->h_id,
            'temp' => $this->temp,
            'pressure' => $this->pressure,
            'station' => $this->station,
            'room' => $this->room,
            'floor' => $this->floor,
            'position' => $this->position,
            'has_ecmo' => $this->has_ecmo,
            'is_high_care' => $this->is_high_care,
            'is_available' => $this->is_available,
            'is_reserved' => $this->is_reserved,
            'reserved_until' => $this->reserved_until,
            'status_updated_at' => $this->status_updated_at
        ];
    }
}
