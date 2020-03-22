<?php

return [

    // Required. The name of your app, as it will be displayed in Sharp.
    "name" => "Bedfinder",

    // Optional. You can here customize the URL segment in which Sharp will live. Default in "sharp".
    "custom_url_segment" => "sharp",

    // Optional. You can prevent Sharp version to be displayed in the page title. Default is true.
    "display_sharp_version_in_title" => true,

    // Required. Your entities list; each one must define a "list",
    // and can define "form", "validator", "policy" and "authorizations".
    "entities" => [
       "hospital" => [
           "list" => \App\Sharp\HospitalList::class,
           "form" => \App\Sharp\HospitalForm::class,
       ],
       "bed" => [
        "list" => \App\Sharp\BedList::class,
        "form" => \App\Sharp\BedForm::class,
    ],
    ],

    // Optional. Your dashboards list; each one must define a "view", and can define "policy".
    "dashboards" => [
//        "my_dashboard" => [
//            "view" => \App\Sharp\MyDashboardView::class,
//            "policy" => \App\Sharp\Policies\MyDashboardPolicy::class,
//        ],
        "hospital_dashboard" => [
            "view" => \App\Sharp\HospitalDashboard::class,
        ],
    ],

    // Optional. Your global filters list, which will be displayed in the main menu.
    "global_filters" => [
//        "my_global_filter" => \App\Sharp\Filters\MyGlobalFilter::class
    ],

    // Required. The main menu (left bar), which may contain links to entities, dashboards
    // or external URLs, grouped in categories.
    "menu" => [
       [
           "label" => "Verwaltung",
           "entities" => [
                [
                    "label" => "Dashboard",
                    "icon" => "fa-dashboard",
                    "dashboard" => "hospital_dashboard"
                ],               
               [
                   "label" => "Krankenhäuser",
                   "icon" => "fa-hospital-o",
                   "entity" => "hospital"
               ],
               [
                   "label" => "Betten",
                   "icon" => "fa-bed",
                   "entity" => "bed"
               ],
           ]
       ],
//        [
//            "label" => "My entity again",
//            "icon" => "fa-page",
//            "entity" => "my_entity"
//        ]
    ],

    // Optional. Your file upload configuration.
    "uploads" => [
        // Tmp directory used for file upload.
        "tmp_dir" => env("SHARP_UPLOADS_TMP_DIR", "tmp"),

        // These two configs are used for thumbnail generation inside Sharp.
        "thumbnails_disk" => env("SHARP_UPLOADS_THUMBS_DISK", "public"),
        "thumbnails_dir" => env("SHARP_UPLOADS_THUMBS_DIR", "thumbnails"),
    ],

    // Optional. Auth related configuration.
    "auth" => [
        // Name of the login and password attributes of the User Model.
        "login_attribute" => "name",
        "password_attribute" => "password",

        // Name of the attribute used to display the current user in the UI.
        "display_attribute" => "name",

        // Optional additional auth check.
//        "check_handler" => \App\Sharp\Auth\MySharpCheckHandler::class,

        // Optional custom guard
//        "guard" => "sharp",
    ],
    "extensions" => [
        "assets" => [
           "strategy" => "raw",
           "head"     => [
              "/css/inject.css", // Outputs <link rel="stylesheet" href="/css/inject.css"> after sharp assets
           ],
        ],
     ],
];