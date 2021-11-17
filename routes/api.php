<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
    
// });
Route::post('/login', 'UserController@login');
	
    // auth routes
Route::group(['middleware' =>'api','auth:api'], function () {

    //Users Managment
    Route::get('/users/index','UserController@index')->name('users.index');
    Route::get('/role-list','UserController@rolelist')->name('role.list');
    Route::post('/user/store','UserController@store')->name('user.store');
    Route::get('/edit/user/{id}','UserController@edit')->name('edit.user');
    Route::post('/user/update/{id}','UserController@update');
    Route::get('/delete/users/{id}','UserController@delete');



    //Roles Management
    Route::get('/roles/index','RoleController@index');
    Route::get('permission/list','RoleController@create');
    Route::post('/roles/store','RoleController@store');
    Route::get('/edit/roles/{id}','RoleController@edit');
    Route::post('/roles/update/{id}','RoleController@update');
    Route::get('/delete/roles/{id}','RoleController@delete');

    //Product Management
    Route::get('/product/index','ProductController@index');
    Route::post('/product/store','ProductController@store');
    Route::get('/edit/product/{id}','ProductController@edit');
    Route::post('/product/update/{id}','ProductController@update');
    Route::get('/delete/roles/{id}','RoleController@delete');

});