<?php

namespace App\Sharp;

use App\Models\Hospital;
use Code16\Sharp\EntityList\SharpEntityList;
use Code16\Sharp\EntityList\EntityListQueryParams;
use Code16\Sharp\EntityList\Containers\EntityListDataContainer;

class HospitalList extends SharpEntityList
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
        )
        ->addDataContainer(
            EntityListDataContainer::make('name')
            ->setLabel('Name')
            ->setSortable()
        )
        ->addDataContainer(
            EntityListDataContainer::make('city')
            ->setLabel('Stadt')
            ->setSortable()
        )
        ->addDataContainer(
            EntityListDataContainer::make('postal_code')
            ->setLabel('Postleitzahl')
            ->setSortable()
        );
    }

    /**
    * Build list layout using ->addColumn()
    *
    * @return void
    */
    public function buildListLayout()
    {
        $this->addColumn('id', 1)
            ->addColumn('name',5)
            ->addColumn('city',3)
            ->addColumn('postal_code',3);
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
        return $this->transform(Hospital::all());
    }
}
