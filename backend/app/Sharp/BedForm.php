<?php

namespace App\Sharp;

use App\Models\Bed;
use Code16\Sharp\Form\SharpForm;
use Code16\Sharp\Form\Layout\FormLayoutColumn;
use Code16\Sharp\Form\Layout\FormLayoutFieldset;
use Code16\Sharp\Form\Fields\SharpFormTextField;
use Code16\Sharp\Form\Fields\SharpFormCheckField;
use Code16\Sharp\Form\Eloquent\WithSharpFormEloquentUpdater;

class BedForm extends SharpForm
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
            Bed::findOrFail($id)
        );
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed the instance id
     */
    public function update($id, array $data)
    {
        $bed = $id ? Bed::findOrFail($id) : new Bed;
        $this->save($bed, $data);
    }

    /**
     * @param $id
     */
    public function delete($id)
    {
        Bed::findOrFail($id)->find($id)->delete();
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
        )->addField(
            SharpFormTextField::make('floor')
                ->setLabel('Etage')
                ->setReadOnly(true)
        )->addField(
            SharpFormTextField::make('station')
                ->setLabel('Station')
                ->setReadOnly(true)
        )->addField(
            SharpFormTextField::make('room')
                ->setLabel('Zimmer')
                ->setReadOnly(true)
        )->addField(
            SharpFormTextField::make('position')
                ->setLabel('Position')
                ->setReadOnly(true)
        )->addField(
            SharpFormCheckField::make('is_available', 'Bett verfügbar')
        )->addField(
            SharpFormCheckField::make('is_reserved', 'Bett reserviert')
        )->addField(
            SharpFormCheckField::make('has_ecmo', 'Bett verfügbar')
        )->addField(
            SharpFormCheckField::make('is_high_care', 'Bett reserviert')
        );
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
                ->withSingleField('floor')
                ->withSingleField('station')
                ->withSingleField('room')
                ->withSingleField('position');
        });

        $this->addColumn(6, function(FormLayoutColumn $column) {
            $column->withFieldset("Kapazität", function(FormLayoutFieldset $fieldset) {
                return $fieldset->withSingleField("is_available")
                                ->withSingleField("is_reserved");
            });

            $column->withFieldset("Ausstattung", function(FormLayoutFieldset $fieldset) {
                return $fieldset->withSingleField("has_ecmo")
                                ->withSingleField("is_high_care");
            });  
        });
    }
}
