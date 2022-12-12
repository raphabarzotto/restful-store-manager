# Restful Store Manager
Simple Restful API built using express in Javascript.

Project was made in July 2022 as a part of [Trybe's Back-end Course](https://www.betrybe.com/)

# How to Install
You can use any of the methods to install.

To test it, you can use any API client like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).
<details>
  <summary><strong>Locally</strong></summary>

  1. `npm install`
  2. `npm run migration` &rarr; to create database
  3. `npm run seed` &rarr; to seed database
  4. create a `.env` file based on `.env.example`
  5. `npm start`
</details>
<details>
  <summary><strong>Docker</strong></summary>

  1. `docker-compose up -d` &rarr; to install container
  2. `docker exec -it talker_manager bash` &rarr; to enter container
  3. `npm install`
  4. `npm run migration` &rarr; to create database
  5. `npm run seed` &rarr; to seed database
  6. `npm start`
</details>

# API's routes
1. `GET /products`
  - should return an array with all products
2. `GET /products/:id`
  - should return a product with id given
3. `GET /products/search?q=SearchTerm`
  - will make a query with the search term given and return an array with results
4. `POST /products`
  - body shoul be like this:
  ```json
  {
    "name": "Product Name Here"
  }
  ```
  - if right, shoul return `id` and `name`:
  ```json
  {
    "id": 4,
    "name": "Product Name Here"
  }
  ```
5. `PUT /products/:id`
  - body shoul be like this:
  ```json
  {
    "name": "Product New Name Here"
  }
  ```
  - if right, shoul return `id` and new `name`:
  ```json
  {
    "id": 1,
    "name": "Product New Name Here"
  }
  ```
6. `DELETE /products/:id`
  - if ok, should delete product and return HTTPs status `204`

7. `POST /sales`
  - body should have sale detailed like this:
  ```json
  [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
  ```
  - if ok, will return status `201` and:
  ```json
  {
    "id": 3,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
	  ]
  }
  ```
8. `GET /sales`
  - should return an array with all sales
9. `GET /sales/:id`
  - should return a sale with id given
10. `DELETE /sales/:id`
  - if ok, should delete sale and return HTTPs status `204`
11. `PUT /sales/:id`
  - could not get to make this one work