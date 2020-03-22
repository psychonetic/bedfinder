<?php

namespace App\Http\Controllers;

use App\Events\BedUpdate;
use App\Exceptions\NoAvailableBedException;
use App\Http\Requests\ReserveBedRequest;
use App\Http\Requests\StoreBatchBedRequest;
use App\Http\Requests\StoreBedRequest;
use App\Http\Resources\BedCollection;
use App\Http\Resources\BedInfoCollection;
use App\Http\Resources\BedResource;
use App\Models\Hospital;
use App\Models\Bed;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Hospital $hospital
     * @return BedCollection
     */
    public function index(Hospital $hospital)
    {
        return new BedCollection($hospital->beds);
    }

    /**
     * @param StoreBedRequest $request
     * @param Hospital $hospital
     * @return BedResource
     */
    public function store(StoreBedRequest $request, Hospital $hospital)
    {
        $bed = Bed::create(array_merge(request()->all(), ['h_id' => $hospital->id]));
        return new BedResource($bed);
    }

    /**
     *
     * @param Hospital $hospital
     * @return
     */
    public function info(Hospital $hospital)
    {
        $beds = Bed::aggregate($hospital->id)->get();

        return new BedInfoCollection($beds);
    }

    /**
     * @param StoreBatchBedRequest $request
     * @param Hospital $hospital
     * @return BedCollection
     */
    public function storeBatch(StoreBatchBedRequest $request, Hospital $hospital)
    {
        $beds = collect();
        DB::transaction(function () use (&$beds, &$hospital) {
            foreach (request()->all() as $bed) {
                $b = Bed::create(array_merge($bed, ['h_id' => $hospital->id]));
                $beds->push($b);
            }
        });

        return new BedCollection($beds);
    }

    /**
     * @param StoreBedRequest $request
     * @param Hospital $hospital
     * @param Bed $bed
     * @return BedResource
     */
    public function update(StoreBedRequest $request, Hospital $hospital, Bed $bed)
    {
        if (request('reserved_until')) {
            $bed->update(array_merge(request()->all(), ['reserved_until' => Carbon::parse(request('reserved_until'))]));
        } else {
            $bed->update(request()->all());
        }

        return new BedResource($bed);
    }

    /**
     * @param Hospital $hospital
     * @param Bed $bed
     * @return BedResource
     */
    public function show(Hospital $hospital, Bed $bed)
    {
        return new BedResource($bed);
    }

    /**
     * @param Hospital $hospital
     * @return BedResource
     * @throws NoAvailableBedException
     */
    public function reserveWithCondition(Hospital $hospital)
    {
        $isHighCare = request('is_high_care') ?? false;
        $withEcmo = request('has_ecmo') ?? false;

        $bed = Bed::findAvailableBy($hospital->id, $isHighCare, $withEcmo)->first();
        if (!$bed) {
            throw new NoAvailableBedException('There is no bed available');
        }

        return new BedResource($this->reserveBed($hospital, $bed));
    }


    /**
     * @param Hospital $hospital
     * @return BedResource
     * @throws NoAvailableBedException
     */
    public function freeWithCondition(Hospital $hospital)
    {
        $isHighCare = request('is_high_care') ?? false;
        $withEcmo = request('has_ecmo') ?? false;
        $bed = Bed::findBlockedBy($hospital->id, $isHighCare, $withEcmo)->first();
        if (!$bed) {
            throw new NoAvailableBedException('There is no bed available');
        }

        $bed->update([
            'is_available' => true,
            'status_updated_at' => Carbon::now(),
            'reserved_until' => null,
        ]);

        return new BedResource($bed);
    }

    /**
     * @param Hospital $hospital
     * @param Bed $bed
     * @return Bed
     */
    protected function reserveBed(Hospital $hospital, Bed $bed)
    {
        $reservedUntil = request('reserved_until', null);
        if ($reservedUntil) {
            $reservedUntil = Carbon::parse(request('reserved_until'));
        }
        $bed->update(['is_reserved' => true,
            'is_available' => false,
            'status_updated_at' => Carbon::now(),
            'reserved_until' => $reservedUntil]);

        return $bed;
    }

    /**
     * @param ReserveBedRequest $request
     * @param Hospital $hospital
     * @param Bed $bed
     * @return BedResource
     */
    public function reserve(ReserveBedRequest $request, Hospital $hospital, Bed $bed)
    {
        return new BedResource($this->reserveBed($hospital, $bed));
    }

    /**
     * @param Hospital $hospital
     * @param Bed $bed
     * @return BedResource
     */
    public function free(Hospital $hospital, Bed $bed)
    {
        $bed->update([
            'is_available' => true,
            'status_updated_at' => Carbon::now(),
            'is_reserved' => false,
            'reserved_until' => null]);

        return new BedResource($bed);
    }

    /**
     * @param Hospital $hospital
     * @param Bed $bed
     * @return BedResource
     */
    public function block(Hospital $hospital, Bed $bed)
    {
        $bed->update(['is_available' => false, 'status_updated_at' => Carbon::now()]);

        return new BedResource($bed);
    }

}
