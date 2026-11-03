<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClassTeacher extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $primaryKey = ['class_id', 'teacher_user_id'];
    public $timestamps = false;

    protected $fillable = [
        'class_id',
        'teacher_user_id',
        'role',
        'created_at',
    ];

    public function class(): BelongsTo
    {
        return $this->belongsTo(LmsClass::class, 'class_id');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_user_id');
    }
}
