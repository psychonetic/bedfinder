<?php

namespace App\Http\Controllers;

use App\Http\Resources\HospitalCollection;
use App\Http\Resources\HospitalResource;
use App\Models\Hospital;

class HospitalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return HospitalCollection
     */
    public function index()
    {
        $hospitals = null;
        $limit = request('limit', 10);
        $with = null;
        $info = false;

        if (request('with')) {
            $with = explode(',',request('with'));
        }


        if (request('lat') && request('lng')) {
            $distance = request('distance', 10);
            $hospitals = Hospital::findWithinDistance(request('lat'), request('lng'), $distance)->limit($limit)->get();
        }

        if (request('postal_code') && request('city')) {
            $hospitals = Hospital::findByPostalAndCity(request('postal_code'), request('city'))->limit($limit)->get();
        }

        $hospitals = $hospitals ?? Hospital::paginate(10);

        if (is_array($with) && in_array('beds', $with)) {
            $hospitals->load('beds');
        }
        if (is_array($with) && in_array('info', $with)) {
            $info = true;
        }

        return new HospitalCollection($hospitals, $info);
    }

    /**
     * Display the specified resource.
     *
     * @param Hospital $model
     * @return HospitalResource
     */
    public function show(Hospital $model)
    {
        return new HospitalResource($model, true);
    }
}
