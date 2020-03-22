<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class HospitalCollection extends ResourceCollection
{

    protected $withInfo = false;


    public function __construct($resource, bool $info)
    {
        parent::__construct($resource);
        $this->withInfo = $info;
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  Request
     * @return array
     */
    public function toArray($request)
    {
        $info = $this->withInfo;
        return $this->resource->map(function($item) use ($info) {
            return new HospitalResource($item, $info);
         });
    }
}
