class ProductsController < ApplicationController
  def index
    products = [
      {
        id: 1,
        name: 'Marvel\'s The Avengers',
        price: 19.99
      },
      {
        id: 2,
        name: 'Avengers: Infinity War',
        price: 19.99
      },
      {
        id: 3,
        name: 'Marvel\'s Captain America: Civil War',
        price: 19.99
      },
      {
        id: 4,
        name: 'Black Panther',
        price: 19.77
      },
      {
        id: 5,
        name: 'Doctor Strange',
        price: 22.99
      }
    ]

    results = {
      data: products
    }

    render json: results
  end
end
