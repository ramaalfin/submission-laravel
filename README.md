# Laravel Beginner Demo-Project: Personal Blog

demo requirement brief

---

This repository is intentionally empty, with only a Readme file. Your task is to submit a Pull Request with your version of implementing the task and your PR will be reviewed by our team.

---

You need to create a simple Article with just 5 pages:

- Homepage: List of articles
- Article page to show single Article
- Create page to create new Article
- Edit page to update existing Article
- Some static text page like "About me"

Also, there should be a Login mechanism with Register for the author to write articles:

- Manage (meaning, create/update/delete) categories
- Manage tags
- Manage articles
- For Auth Starter Kit, use [Laravel Breeze](https://github.com/laravel/breeze) (Tailwind) or [Laravel UI](https://github.com/laravel/ui) (Bootstrap) - that starter kit will have some design, which is enough: the design is irrelevant for accomplishing the task

**DB Structure:**

- Article has title (required), full text (required), and image to upload (optional)
- Article may have only one category, but may have multiple tags

## **Features to implement**

---

Here's the [list of Roadmap features](https://www.notion.so/Modules-Beginner-Level-50b56d0da29d453f9172ee11636b3a8a) you need to try to implement in your code:

**Routing and Controllers: Basics**

- Callback Functions and Route::view()
- Routing to a Single Controller Method
- Route Parameters
- Route Naming
- Route Groups

**Blade Basics**

- Displaying Variables in Blade
- Blade If-Else and Loop Structures
- Blade Loops
- Layout: @include, @extends, @section, @yield
- Blade Components

**Auth Basics**

- Default Auth Model and Access its Fields from Anywhere
- Check Auth in Controller / Blade
- Auth Middleware

**Database Basics**

- Database Migrations
- Basic Eloquent Model and MVC: Controller -> Model -> View
- Eloquent Relationships: belongsTo / hasMany / belongsToMany
- Eager Loading and N+1 Query Problem

**Full Simple CRUD**

- Route Resource and Resourceful Controllers
- Forms, Validation, and Form Requests
- File Uploads and Storage Folder Basics
- Table Pagination

## **Example Solutions**

---

If you need help, or you want to compare your version with our simple version, here the public repositories with the solution:

[https://github.com/DiazFarindra/laravel-beginner-demo-project](https://github.com/DiazFarindra/laravel-beginner-demo-project)

**Notice**: please look at those repositories only **AFTER** you've accomplished the task yourself, or if you're confident about your Laravel beginner skills and you think you don't need to practice this task.
