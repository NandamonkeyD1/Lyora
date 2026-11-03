<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Material extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'workspace_id',
        'class_id',
        'topic_id',
        'title',
        'content_type',
        'text_content',
        'file_path',
        'file_name',
        'file_size_bytes',
        'file_mime_type',
        'external_url',
        'allow_download',
        'status',
        'scheduled_at',
        'published_at',
        'order_index',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'allow_download' => 'boolean',
            'scheduled_at' => 'datetime',
            'published_at' => 'datetime',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class, 'workspace_id');
    }

    public function class(): BelongsTo
    {
        return $this->belongsTo(LmsClass::class, 'class_id');
    }

    public function topic(): BelongsTo
    {
        return $this->belongsTo(MaterialTopic::class, 'topic_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
