<?php

namespace App\Events;

use App\Http\Resources\BedInfoCollection;
use App\Models\Bed;
use App\Models\Hospital;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class HospitalUpdate implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $hospital;

    /**
     * Create a new event instance.
     *
     * @param Hospital $hospital
     */
    public function __construct(Hospital $hospital)
    {
        $this->hospital = $hospital;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('hospital'.$this->hospital->id);
    }

    public function broadcastWith()
    {
        $beds = Bed::aggregate($this->hospital->id)->get();

        return (new BedInfoCollection($beds))->toArray(null);
    }

    public function broadcastAs()
    {
        return 'bed-update';
    }
}
