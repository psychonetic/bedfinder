<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class StoreBatchBedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            '*.temp' => ['numeric'],
            '*.pressure' => ['numeric'],
            '*.station' => ['string'],
            '*.room' => ['string'],
            '*.floor' => ['string'],
            '*.position' => ['string'],
            '*.has_ecmo' => ['boolean'],
            '*.is_high_care' => ['boolean'],
            '*.is_available' => ['boolean'],
            '*.is_reserved' => ['boolean'],
            '*.reserved_until' => ['date'],
            '*.status_updated_at' => ['date'],
        ];
    }
}
