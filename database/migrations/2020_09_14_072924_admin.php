<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Admin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('tbl_admin', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tentaikhoan')->unique();
            $table->string('email');
            $table->string('password');
            $table->string('matruong');
            $table->string('mahuyen');
            $table->string('loaixa');
            $table->string('level');
            $table->rememberToken();
            $table->timestamps();
     });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
         Schema::dropIfExists('tbl_admin');
    }
}
