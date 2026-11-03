<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class LmsClass extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'classes';

    protected $fillable = [
        'workspace_id',
        'subject_id',
        'name',
        'education_level',
        'type',
        'description',
        'cover_image_url',
        'enrollment_policy',
        'status',
        'primary_teacher_id',
        'max_capacity',
        'academic_period',
    ];

    protected function casts(): array
    {
        return [
            'max_capacity' => 'integer',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class, 'workspace_id');
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function primaryTeacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'primary_teacher_id');
    }

    public function teachers(): HasMany
    {
        return $this->hasMany(ClassTeacher::class, 'class_id');
    }

    public function members(): HasMany
    {
        return $this->hasMany(ClassMember::class, 'class_id');
    }

    public function invitationCodes(): HasMany
    {
        return $this->hasMany(ClassInvitationCode::class, 'class_id');
    }

    public function topics(): HasMany
    {
        return $this->hasMany(MaterialTopic::class, 'class_id')->orderBy('order_index');
    }

    public function materials(): HasMany
    {
        return $this->hasMany(Material::class, 'class_id');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class, 'class_id');
    }

    public function quizzes(): HasMany
    {
        return $this->hasMany(Quiz::class, 'class_id');
    }

    public function meetings(): HasMany
    {
        return $this->hasMany(Meeting::class, 'class_id');
    }
}
