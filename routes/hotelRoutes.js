const express = require('express');
const HotelController = require('../controllers/hotelController');
const router = express.Router();

// Rotas para hotéis
router.get('/', HotelController.getHotels);
router.get('/id/:id', HotelController.getHotelById);
router.get('/name/:name', HotelController.getHotelsByName);
router.get('/category/:category', HotelController.getHotelsByCategory);
router.get('/chain/:chain', HotelController.getHotelsByChain);

router.get('/nearby/:id', HotelController.getHotelGeolocation);

// Rotas para criar entidades
router.post('/', HotelController.createHotel);
router.post('/category', HotelController.createCategory);
router.post('/hotelchain', HotelController.createHotelChain);

module.exports = router;
