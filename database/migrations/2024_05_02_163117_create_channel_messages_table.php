<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Channel;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('channel_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Channel::class)->constrained()->cascadeOnDelete();
            $table->string("contenu");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('channel_messages');
    }
};
