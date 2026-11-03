<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MaterialTopic extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'class_id',
        'title',
        'description',
        'order_index',
    ];

    public function class(): BelongsTo
    {
        return $this->belongsTo(LmsClass::class, 'class_id');
    }

    public function materials(): HasMany
    {
        return $this->hasMany(Material::class, 'topic_id')->orderBy('order_index');
    }
}
