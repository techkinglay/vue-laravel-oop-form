<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
   public function test(){
   	$this->validate(request(),[
   		'email'=>'required',
   		'password'=>'required',
   	]);


    // data save actoion




    //return action

    return ['message'=>'Successs'];
   }
}
