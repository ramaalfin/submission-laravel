<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::latest()->paginate(5);
        $title = "Tag";
        return Inertia::render('Tag/Index', compact('tags', 'title'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tag/Create', [
            'title' => 'Create Tag'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TagRequest $request)
    {
        Tag::create([
            'name' => $request->name
        ]);
        return redirect()->back()->with('message', 'Tag has been successfully created');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        return Inertia::render("Tag/Edit", [
            'title' => "Edit Tag",
            'tag' => $tag
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TagRequest $request, Tag $tag)
    {
        $tag->update([
            'name' => $request->name
        ]);
        return redirect()->back()->with('message', 'Tag has been successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        foreach ($tag->news as $news) {
            $news->tags()->detach();
        }

        if (!$tag->news()->exists()) {
            $tag->delete();
            return redirect()->back()->with('success', 'Tag has been successfully deleted');
        } else {
            return redirect()->back()->with('error', 'Tag has any news');
        }
    }
}
