## Idea:
- Present that I know how everything works
- Create a simple Theme
- Training purposes

Theme was created with Theme Kit.
Some of the files have code by default and were not touched by me.

#### Files in which I made changes:
- assets/application.js
- layout/theme.liquid
- sections/*
- snippets/*
- src/*
- templates/product.liquid
- templates/customers/login.liquid
- templates/customers/register.liquid

#### Additional libraries:
- Bootstrap
- jQuery
- Slick library 
- laravel.mix (for compiling bootstrap)

#### How to use:
Example: After downloading the repository. Delete folders/files that are not used by Shopify platform
and import the theme to the Shopify platform in the theme section.

#### What to check:
1. Sections on Home page:
- Featured Blog (not finished)
- Custom HTML

2. Header:
- Navbar
- Navbar under (It can create adidtional icons. One of them opens the side cart)

3. Footer (not finished yet)

4. Product page (not finished yet)
- Add button works without page refresh
- The cart icon on navbar should display 1 more item after clicking the button
- You need to be logged in in order to add an item

5. Navbar has a possibility to login and register. Based on if user is logged in
different menu is displayed. (I did not do the same thing to the website content).

6. Side menu which works and refreshes along with jQuery in application.js. Can be accessed
through the icon in 'Navbar under'
