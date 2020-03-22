<?php

namespace App\Http\Resources;
use App\Models\Bed;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\Resource;

class HospitalResource extends Resource
{

    protected $withInfo = false;

    public function __construct($resource, $info = false)
    {
        parent::__construct($resource);
        $this->withInfo = $info;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  Request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'contact' => [
              'phone_1' =>  $this->phone_1,
              'phone_2' =>  $this->phone_2,
              'phone_3' =>  $this->phone_3,
            ],
            'name' => $this->name,
            'description' => $this->description,
            'address' => [
                'street' => $this->street,
                'city' => $this->city,
                'postal_code' => $this->postal_code,
                'country' => $this->country,
                'lat' => $this->lat,
                'lng' => $this->lng,
                'distance' => $this->distance,
            ],
            'beds' => new BedCollection($this->whenLoaded('beds')),
        ];

        if ($this->withInfo) {
            $info = Bed::aggregate($this->id)->get();
            $data = array_merge($data, ['info' => new BedInfoCollection($info)]);
        }

        return $data;
    }
}
