# Shopping Cart with Vue.js and Ruby on Rails

This project is a demonstration of how to incorporate Vue.js into a Rails application. It was designed to accompany "Vue.js & Rails: An Unlikely Friendship.pptx", a PowerPoint presentation which is included in this repository.

## Dependencies
* NodeJS
* npm or yarn

## Getting Started
`bundle install`

`yarn` or `npm install`

`bundle exec rails s`

## Concepts Demonstrated
* Vue SPA in Rails app (app/javascript/packs/hello_vue.js)
* vue-router for routing (app/javascript/packs/router.js)
* vuex store for centralized state management (app/javascript/packs/store.js)
* axios to make REST API calls (app/javascript/packs/store.js)

## Steps to Recreate
1. Ensure that Rails 5.1 or greater is installed
2. `rails new shopping-cart --skip-turbolinks --webpack=vue`
3. `cd shopping-cart`
4. `bundle install` and `yarn` or `npm install`
5. `bundle exec rails s` to see if your dependencies were installed correctly
6. Take a look at the generated code in app/javascript/ for further instructions
