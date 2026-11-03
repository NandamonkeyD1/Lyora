<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workspace extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'logo_url',
        'banner_url',
        'address',
        'contact_email',
        'contact_phone',
        'website_url',
        'storage_quota_bytes',
        'storage_used_bytes',
        'is_active',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'storage_quota_bytes' => 'integer',
            'storage_used_bytes' => 'integer',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members(): HasMany
    {
        return $this->hasMany(WorkspaceMember::class, 'workspace_id');
    }

    public function classes(): HasMany
    {
        return $this->hasMany(LmsClass::class, 'workspace_id');
    }

    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class, 'workspace_id');
    }
}
