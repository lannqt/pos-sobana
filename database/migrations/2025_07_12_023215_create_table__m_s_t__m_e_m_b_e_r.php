<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('MST_MEMBER', function (Blueprint $table) {
            $table->id('MEMBER_ID');
            $table->string('NM_MEMBER', 55)->comment('Nama Member');
            $table->integer('NO_WA')->comment('Nomor Telepon');
            $table->longText('ALAMAT')->comment('Alamat Member');
            $table->integer('POINT')->comment('Point Member');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('MST_MEMBER');
    }
};
