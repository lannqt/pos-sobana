<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterMember extends Model
{
    protected $table = 'mst_member';
     protected $fillable = [
        'NM_MEMBER ',
        'NO_WA ',
        'ALAMAT ',
        'POINT ',
    ];
}
