<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParentStudentLink extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'parent_user_id',
        'student_user_id',
        'relationship_type',
        'verification_code',
        'status',
        'code_expires_at',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'code_expires_at' => 'datetime',
            'verified_at' => 'datetime',
        ];
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_user_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_user_id');
    }
}
