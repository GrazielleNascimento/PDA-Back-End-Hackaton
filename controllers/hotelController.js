const Hotel = require('../models/hotel');
const Category = require('../models/category');
const HotelChain = require('../models/hotelChain');

const HotelController = {
  async getHotels(req, res) {
    try {
      const { category, hotelChain, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = {};

      if (category) {
        whereClause.categoryId = category;
      }

      if (hotelChain) {
        whereClause.hotelChainId = hotelChain;
      }

      const { count, rows } = await Hotel.findAndCountAll({
        where: whereClause,
        include: ['category', 'hotelChain'],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      res.status(200).json({
        data: rows,
        meta: {
          total: count,
          page: parseInt(page, 10),
          pages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  },

  async createHotel(req, res) {
    try {
      const hotel = await Hotel.create(req.body);
      res.status(201).json(hotel);
    } catch (error) {
      console.error('Error creating hotel:', error);
      res.status(500).json({ error: 'Failed to create hotel' });
    }
  },

  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  },

  async createHotelChain(req, res) {
    try {
      const hotelChain = await HotelChain.create(req.body);
      res.status(201).json(hotelChain);
    } catch (error) {
      console.error('Error creating hotel chain:', error);
      res.status(500).json({ error: 'Failed to create hotel chain' });
    }
  },
};

module.exports = HotelController;
