## Idea:
- I focused more to present that I know how everything works
- The styling is basic. Some of the styles are in the folder src in scss files and some in liquid files 

Theme was created with Theme Kit.
Some of the files have code by default and were not touched by me.

#### Files in which I made changes:
assets/application.js
layout/theme.liquid
sections/*
snippets/*
src/*
templates/product.liquid
templates/customers/login.liquid
templates/customers/register.liquid

#### Additional libraries:
- Bootstrap
- jQuery
- Slick library 
- laravel.mix (for compiling bootstrap)

#### How to use:
Example: After downloading the repository. Delete folders that are not used by Shopify platform
and import the theme to the Shopify platform in theme section.

#### What to check:
1. Sections on Home page:
- Featured Blog
- Custom HTML

2. Header
3. Footer
4. Product page
- Add button works without page refresh
- The cart icon on navbar should display 1 more item after clicking the button
- You need to be logged in in order to add an item

5. Navbar has a possibility to login and register. Based on if user is logged in
different menu is displayed. (I did not do the same thing to the website content).


------------


I did not focus on meta tags, global theme styling, translations, aria and making
namespaces in javascript. The code is only a sample.
I tried to avoid copying and pasting.

If you would like me to code any specific functionality, please let me know.
