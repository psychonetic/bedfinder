<?php
namespace App;


use App\Models\Bed;
use App\Models\Hospital;

class DiviAdapter {

    protected $items = [];

    public function parse(string $path)
    {
        $string = file_get_contents(base_path($path));
        $this->items = json_decode($string, true);

        return $this;
    }

    public function create()
    {

        foreach ($this->items as $item) {
            if (array_key_exists('location',$item)) {
                $hospital = Hospital::create([
                    'name' => $item['hospital-name'],
                    'description' => array_key_exists('hospital-department', $item) ? $item['hospital-department'] : '',
                    'street' => $item['hospital-street'],
                    'city' => $item['hospital-city'],
                    'postal_code' => $item['hospital-postalcode'],
                    'lat' => $item['location']['lat'],
                    'lng' => $item['location']['lng'],
                ]);
                factory(Bed::class, 100)->create()->each(function($bed) use($hospital) {
                    $bed->h_id = $hospital->id;
                    $bed->save();
                });
            }
        }
    }

}
