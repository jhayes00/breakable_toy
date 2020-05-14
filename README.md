# SQRL
This app allows signed-in users to track items that exist in their pantry, and to search for recipes that use those ingredients via the Spoonacular API.  If the user finds a recipe they want to make but they are missing an ingredient, they can click that ingredient to see a list of alternatives.

## Usage
Visit https://sqrl-pantry.herokuapp.com/

-or-

Bundle, migrate database, and start the Rails server from the root folder.
```
$ bundle exec bundle install
$ bundle exec rake db:migrate
$ bundle exec rails s
```
Then navigate to http://localhost:3000 in your browser.

![Screenshot](screenshot.png)

## TODO
* Option to filter recipe search with pantry item checkboxes
* Add pantry sections to sort by item type
* User ability to add ingredient alternatives
* Update pantry automatically when recipe is made
