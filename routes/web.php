<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', [NewsController::class, 'index'])->name('home');
    Route::get('/myNews', [NewsController::class, 'myNews'])->name('myNews');
    Route::resource('news', NewsController::class);

    Route::resource('category', CategoryController::class);

    Route::resource('tag', TagController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/about-me', [AboutController::class, 'index'])->name('about');
});

require __DIR__.'/auth.php';
