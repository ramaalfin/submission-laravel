<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category_id = Category::pluck('id')->all();
        $user_id = User::pluck('id')->all();
        return [
            'title' => fake()->sentence(10),
            'description' => fake()->paragraph(2, true),
            'category_id' => fake()->randomElement($category_id),
            'user_id' => fake()->randomElement($user_id),
        ];
    }
}
