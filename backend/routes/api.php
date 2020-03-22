<?php

use App\Models\Bed;
use App\Models\Hospital;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('hospitals', 'HospitalController@index');
Route::get('hospitals/{hospital}', 'HospitalController@show');
Route::get('hospitals/{hospital}/beds', 'BedController@index');
Route::post('hospitals/{hospital}/beds', 'BedController@store');
Route::patch('hospitals/{hospital}/beds/reserve', 'BedController@reserveWithCondition');
Route::patch('hospitals/{hospital}/beds/free', 'BedController@freeWithCondition');
Route::get('hospitals/{hospital}/beds/info', 'BedController@info');
Route::post('hospitals/{hospital}/beds/batch', 'BedController@storeBatch');
Route::get('hospitals/{hospital}/beds/{bed}', 'BedController@show');
Route::patch('hospitals/{hospital}/beds/{bed}', 'BedController@update');
Route::patch('hospitals/{hospital}/beds/{bed}/reserve', 'BedController@reserve');
Route::patch('hospitals/{hospital}/beds/{bed}/block', 'BedController@block');
Route::patch('hospitals/{hospital}/beds/{bed}/free', 'BedController@free');


Route::bind('hospital', function ($value) {
    return Hospital::findOrFail($value);
});
Route::bind('bed', function ($value, $route) {
    $hospital = $route->parameter('hospital');
    return Bed::where('id', $value)->where('h_id', $hospital->id)->first() ?? abort(404);
});
