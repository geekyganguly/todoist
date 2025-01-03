<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $frontendURL = Config::get('app.frontend_url');
    return redirect()->away($frontendURL);
});
