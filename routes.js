"use strict";

//require the express module
const express = require("express");

//create a new Router object
const routes = express.Router();

const items = [
  { id: 1, product: "Earl Grey Scones", price: 2.5, quantity: 5 },
  { id: 2, product: "Honey Fig Buns", price: 1.5, quantity: 3 },
  { id: 3, product: "Raspberry Fudge", price: 3, quantity: 9 },
  { id: 4, product: "Rosemary Lemon Biscuits", price: 2, quantity: 2 },
  { id: 5, product: "Pain au Chocolat", price: 3, quantity: 5 },
];

let nextId = 6;

//"/cart-items" is the route that we are setting
routes.get("/cart-items", (req, res) => {
  if (req.query.maxPrice) {
    let filteredArray = items.filter((item) => {
      return item.price <= parseFloat(req.query.maxPrice);
    });
    res.status(200);
    res.json(filteredArray);
  } else if (req.query.prefix) {
    let filteredArray = items.filter((item) => {
      let currentItem = item.product.toLowerCase();
      return currentItem.startsWith(req.query.prefix.toLowerCase());
    });
    res.status(200);
    res.json(filteredArray);
  } else if (req.query.pageSize) {
    let results = items.slice(0, parseInt(req.query.pageSize));
    res.status(200);
    res.json(results);
  } else {
    res.status(200);
    res.json(items);
  }
});

// number 2
routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let found = items.find((item) => {
    return item.id === id;
  });
  if (found) {
    res.status(200);
    res.json(found);
  }
  res.status(404);
  res.send(`ID: ${id} not found`);
});

//number 3 --add a variable nextID at the top
routes.post("/cart-items", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  items.push(item);
  res.status(200);
  res.json(item);
});

//number 4
routes.put("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = items.findIndex((item) => {
    return item.id === id;
  });

  items[index] = req.body;
  items[index].id = id;
  res.status(200);
  res.json(items[index]);
});

//number 5
routes.delete("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = items.findIndex((item) => {
    return item.id === id;
  });
  items.splice(index, 1);
  res.status(204);
  res.json();
});

//export routes to use in ServiceWorkerRegistration.js
module.exports = routes;
