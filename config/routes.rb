Rails.application.routes.draw do
  root to: 'static_pages#home'
  get "research", :to => "static_pages#research"
  get "nbody", :to => "static_pages#nbody"
  get "asteroids", :to => "static_pages#asteroids"
end
