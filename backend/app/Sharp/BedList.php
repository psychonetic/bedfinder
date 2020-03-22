<?php

namespace App\Sharp;

use App\Models\Bed;
use Code16\Sharp\EntityList\SharpEntityList;
use Code16\Sharp\EntityList\EntityListQueryParams;
use Code16\Sharp\EntityList\Containers\EntityListDataContainer;

class BedList extends SharpEntityList
{
    /**
    * Build list containers using ->addDataContainer()
    *
    * @return void
    */
    public function buildListDataContainers()
    {
        $this->addDataContainer(
            EntityListDataContainer::make('id')
                ->setLabel('ID')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('floor')
                ->setLabel('Etage')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('station')
                ->setLabel('Station')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('room')
                ->setLabel('Zimmer')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('position')
                ->setLabel('Position')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('is_available')
                ->setLabel('Verfügbar')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('is_reserved')
                ->setLabel('Reserviert')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('has_ecmo')
                ->setLabel('ECMO')
                ->setSortable()
                ->setHtml()
        )->addDataContainer(
            EntityListDataContainer::make('is_high_care')
                ->setLabel('Highcare')
                ->setSortable()
                ->setHtml()
        )
        ;
    }

    /**
    * Build list layout using ->addColumn()
    *
    * @return void
    */

    public function buildListLayout()
    {
        $this->addColumn('id', 1)
            ->addColumn('floor', 1)
            ->addColumn('station', 2)
            ->addColumn('is_available', 2)
            ->addColumn('is_reserved', 2)
            ->addColumn('has_ecmo', 1)
            ->addColumn('is_high_care', 2);
    }

    /**
    * Build list config
    *
    * @return void
    */
    public function buildListConfig()
    {
        $this->setInstanceIdAttribute('id')
            ->setSearchable()
            ->setDefaultSort('name', 'asc')
            ->setPaginated();
    }

    /**
    * Retrieve all rows data as array.
    *
    * @param EntityListQueryParams $params
    * @return array
    */
    public function getListData(EntityListQueryParams $params)
    {
        return $this->transform(Bed::paginate());
    }
}
