
const Pin = require('../models/pin.js');
const express = require('express');
const router = express.Router();

// Route for saving a new pin to database
router.post('/', async (request, response) => {
    try {
      if (
        !request.body.id ||
        !request.body.name ||
        !request.body.description ||
        !request.body.latitude ||
        !request.body.longitude ||
        !request.body.userId
      ) {
        return response.status(400).send({
          message: 'Send all required fields',
        });
      }
      const newPin = {
          id : request.body.id,
          name : request.body.name,
          description : request.body.description,
          latitude : request.body.latitude,
          longitude : request.body.longitude,
          createdBy: request.body.userId
      };
  
      const pin = await Pin.create(newPin);
      return response.status(201).send(pin);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for getting all pins for a user from the database
router.get('/', async (request, response) => {
    try {
      const pins = await Pin.find({ createdBy: request.body.userId });
  
      return response.status(200).json({
        count: pins.length,
        data: pins,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for updating a pin identified by its id
  router.put('/', async (request, response) => {
    try {
        if (
            !request.body.id ||
            !request.body.name ||
            !request.body.description ||
            !request.body.latitude ||
            !request.body.longitude ||
            !request.body.userId
          ) {
            return response.status(400).send({
              message: 'Send all required fields',
            });
          }
  
      const result = await Pin.findOneAndUpdate({id: request.body.id, createdBy: request.body.userId}, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Pin not found' });
      }
  
      return response.status(200).send({ message: 'Pin updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Deleting a pin identified by its id
  router.delete('/', async (request, response) => {
    try {
        if (
            !request.body.id ||
            !request.body.name ||
            !request.body.description ||
            !request.body.latitude ||
            !request.body.longitude ||
            !request.body.userId
          ) {
            return response.status(400).send({
              message: 'Send all required fields',
            });
          }
  
      const result = await Pin.findOneAndDelete({id: request.body.id});
  
      if (!result) {
        return response.status(404).json({ message: 'Pin not found' });
      }
  
      return response.status(200).send({ message: 'Pin deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  module.exports = router;