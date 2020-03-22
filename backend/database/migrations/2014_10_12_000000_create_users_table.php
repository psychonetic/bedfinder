<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('h_id')->nullable();
            $table->enum('role', ['doctor', 'management', 'coordination-service', 'medic', 'assistant', 'admin', 'owner']);
            $table->string('name')->nullable();
            $table->string('password')->nullable();
            $table->timestamps();

            $table->foreign('h_id')
                ->references('id')->on('hospitals')
                ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
