<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('h_id')->nullable();
            $table->decimal('temp', 4, 2)->nullable();;
            $table->decimal('pressure', 8, 2)->nullable();
            $table->string('station')->nullable();
            $table->string('room')->nullable();
            $table->string('floor')->nullable();
            $table->string('position')->nullable();
            $table->boolean('has_ecmo')->default(false);
            $table->boolean('is_high_care')->default(false);
            $table->boolean('is_available')->default(false);
            $table->boolean('is_reserved')->default(false);
            $table->timestamp('reserved_until')->nullable();
            $table->timestamp('status_updated_at')->nullable();
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
        Schema::dropIfExists('beds');
    }
}
