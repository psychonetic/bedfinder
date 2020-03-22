<?php

namespace App\Observers;

use App\Events\BedUpdate;
use App\Events\HospitalUpdate;
use App\Models\Bed;
use App\Models\Hospital;
use Carbon\Carbon;

class BedObserver
{

    CONST LC = 1;
    const LC_ECMO = 2;
    const HC = 3;
    const HC_ECMO = 4;

    protected function updateHospitalStatus(Bed $bed, $type)
    {
        $hospital = Hospital::find($bed->h_id);
        if ($hospital) {
            switch ($type) {
                case self::LC:
                    $hospital->update(['status_lc_updated_at' => Carbon::now()]);
                    break;
                case self::LC_ECMO:
                    $hospital->update(['status_lc_updated_at' => Carbon::now(), 'status_lc_ecmo_updated_at' => Carbon::now()]);
                    break;
                case self::HC:
                    $hospital->update(['status_hc_updated_at' => Carbon::now()]);
                    break;
                case self::HC_ECMO:
                    $hospital->update(['status_hc_updated_at' => Carbon::now(), 'status_hc_ecmo_updated_at' => Carbon::now()]);
                    break;
            }
            broadcast(new HospitalUpdate($hospital));
        }
    }

    protected function determineHospitalStatusChange(Bed $bed)
    {
        if ($bed->is_high_care === false) {
            if ($bed->has_ecmo === false) {
                $this->updateHospitalStatus($bed, self::LC);
            } else {
                $this->updateHospitalStatus($bed, self::LC_ECMO);
            }
        } else {
            if ($bed->has_ecmo === false) {
                $this->updateHospitalStatus($bed, self::HC);
            } else {
                $this->updateHospitalStatus($bed, self::HC_ECMO);
            }
        }
    }

    /**
     * Handle the Bed "created" event.
     *
     * @param Bed $bed
     * @return void
     */
    public function created(Bed $bed)
    {
       $this->determineHospitalStatusChange($bed);
    }

    /**
     * Handle the Bed "updated" event.
     *
     * @param Bed $bed
     * @return void
     */
    public function updated(Bed $bed)
    {
        if ($bed->isDirty(['is_reserved', 'is_available', 'has_ecmo', 'is_high_care', 'reserved_until'])) {
            $this->determineHospitalStatusChange($bed);
        }
    }

    /**
     * Handle the Bed "deleted" event.
     *
     * @param Bed $bed
     * @return void
     */
    public function deleted(Bed $bed)
    {
        $this->determineHospitalStatusChange($bed);
    }
}
