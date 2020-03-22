<?php

namespace App\Sharp;

use App\Models\Hospital;
use Code16\Sharp\Form\SharpForm;
use Code16\Sharp\Form\Layout\FormLayoutColumn;
use Code16\Sharp\Form\Fields\SharpFormTextField;
use Code16\Sharp\Form\Eloquent\WithSharpFormEloquentUpdater;
use Code16\Sharp\Form\Fields\SharpFormGeolocationField;

class HospitalForm extends SharpForm
{
    use WithSharpFormEloquentUpdater;

    /**
     * Retrieve a Model for the form and pack all its data as JSON.
     *
     * @param $id
     * @return array
     */
    public function find($id): array
    {
        return $this->transform(
            Hospital::findOrFail($id)
        );
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed the instance id
     */
    public function update($id, array $data)
    {
        $hospital = $id ? Hospital::findOrFail($id) : new Hospital;
        $this->save($hospital, $data);
    }

    /**
     * @param $id
     */
    public function delete($id)
    {
        Hospital::findOrFail($id)->find($id)->delete();
    }

    /**
     * Build form fields using ->addField()
     *
     * @return void
     */
    public function buildFormFields()
    {
        $this->addField(
            SharpFormTextField::make('id')
                ->setLabel('ID')
                ->setReadOnly(true)
        )
        ->addField(
            SharpFormTextField::make('name')
            ->setLabel('Name')
        )
        ->addField(
            SharpFormTextField::make('description')
            ->setLabel('Beschreibung')
        )
        ->addField(
            SharpFormTextField::make('phone_1')
            ->setLabel('Telefonnummer 1')
        )
        ->addField(
            SharpFormTextField::make('phone_2')
            ->setLabel('Telefonnummer 2')
        )
        ->addField(
            SharpFormTextField::make('phone_3')
            ->setLabel('Telefonnummer 3')
        )
        ->addField(
            SharpFormGeolocationField::make('location')
            ->setLabel('Standort')
            ->setReadOnly(true)
        )
        ->addField(
            SharpFormTextField::make('street')
            ->setLabel('Straße')
        )
        ->addField(
            SharpFormTextField::make('city')
            ->setLabel('Stadt')
        )
        ->addField(
            SharpFormTextField::make('postal_code')
            ->setLabel('Postleitzahl')
        )
        ->addField(
            SharpFormTextField::make('country')
            ->setLabel('Land')
        )        
        ;
    }

    /**
     * Build form layout using ->addTab() or ->addColumn()
     *
     * @return void
     */
    public function buildFormLayout()
    {
        $this->addColumn(6, function(FormLayoutColumn $column) {
            $column->withSingleField('id')
            ->withSingleField('name')
            ->withSingleField('description')
            ->withSingleField('phone_1')
            ->withSingleField('phone_2')
            ->withSingleField('phone_3');

        });

        $this->addColumn(6, function(FormLayoutColumn $column) {
            $column->withSingleField('city')
            ->withSingleField('street')
            ->withSingleField('postal_code')
            ->withSingleField('country');
        });
    }
}
