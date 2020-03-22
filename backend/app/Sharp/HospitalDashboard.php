<?php

namespace App\Sharp;

use Code16\Sharp\Dashboard\SharpDashboard;
use Code16\Sharp\Dashboard\DashboardQueryParams;
use Code16\Sharp\Dashboard\Widgets\SharpBarGraphWidget;
use Code16\Sharp\Dashboard\Widgets\SharpPieGraphWidget;
use Code16\Sharp\Dashboard\Widgets\SharpGraphWidgetDataSet;
use Illuminate\Support\Facades\DB;

class HospitalDashboard extends SharpDashboard
{
    /**
     * Build dashboard's widget using ->addWidget.
     */
    protected function buildWidgets()
    {
        $this->addWidget(
            SharpBarGraphWidget::make("capacities")
        )->addWidget(
            SharpPieGraphWidget::make("bed_configuration")
        );
    }

    /**
     * Build dashboard's widgets layout.
     */
    protected function buildWidgetsLayout()
    {
        $this->addFullWidthWidget("capacities")
            ->addFullWidthWidget("bed_configuration");
    }

    /**
     * Build dashboard's widgets data, using ->addGraphDataSet and ->setPanelData
     *
     * @param DashboardQueryParams $params
     */
    protected function buildWidgetsData(DashboardQueryParams $params)
    {
        $high_Care = DB::table('beds')->where('is_high_care', true)
        ->select(DB::raw("'High-Care' as label, count(*) as value"))
        ->groupBy(DB::raw('label'))
        ->get()
        ->pluck("value", "label");;

        $low_care = DB::table('beds')->where('is_high_care', false)
        ->select(DB::raw("'Low-Care' as label, count(*) as value"))
        ->groupBy(DB::raw('label'))
        ->get()
        ->pluck("value", "label");;

        $has_ecmo = DB::table('beds')->where('has_ecmo', true)
        ->select(DB::raw("'ECMO vorhanden' as label, count(*) as value"))
        ->groupBy(DB::raw('label'))
        ->get()
        ->pluck("value", "label");;

        $has_no_ecmo = DB::table('beds')->where('has_ecmo', false)
        ->select(DB::raw("'kein ECMO' as label, count(*) as value"))
        ->groupBy(DB::raw('label'))
        ->get()
        ->pluck("value", "label");

        $this->addGraphDataSet(
            "capacities",
            SharpGraphWidgetDataSet::make($this->getBedCapacityData())
                ->setLabel("Kapazitäten")
                ->setColor("#1f94a9")
        )->addGraphDataSet(
            "bed_configuration",
            SharpGraphWidgetDataSet::make($high_Care)
                ->setLabel("High-Care")
                ->setColor("#1f94a9")
        )->addGraphDataSet(
            "bed_configuration",
            SharpGraphWidgetDataSet::make($low_care)
                ->setLabel("Low-Care")
                ->setColor("#a21161")
        )->addGraphDataSet(
            "bed_configuration",
            SharpGraphWidgetDataSet::make($has_ecmo)
                ->setLabel("ECMO vorhanden")
                ->setColor("#f0512e")
        )->addGraphDataSet(
            "bed_configuration",
            SharpGraphWidgetDataSet::make($has_no_ecmo)
                ->setLabel("kein ECMO")
                ->setColor("#999")
        );
    }

    private function getBedCapacityData() {
        $available = DB::table('beds')->where('is_available', true)
        ->select(DB::raw("'verfügbar' as label, count(*) as value"));

        $unavailable = DB::table('beds')->where('is_available', false)
        ->select(DB::raw("'belegt' as label, count(*) as value"));


        $reserved = DB::table('beds')->where('is_reserved', true)
        ->select(DB::raw("'reserviert' as label, count(*) as value"));

        $total = DB::table('beds')
        ->select(DB::raw("'gesamt' as label, count(*) as value"))
        ->union($reserved)
        ->union($available)
        ->union($unavailable);        

        $total->groupBy(DB::raw('label'));

        $data = $total
        ->get()
        ->pluck("value", "label");

        return $data;
    }
}
