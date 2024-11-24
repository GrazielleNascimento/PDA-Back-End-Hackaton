const { Op } = require('sequelize');
const Hotel = require('../models/hotel');
const Category = require('../models/category');
const HotelChain = require('../models/hotelChain');

const HotelController = {
  // Listar hotéis com filtros, categorização e paginação
  async getHotels(req, res) {
    try {
      const { category, hotelChain, page = 1, limit = 10 } = req.query;

      // Validação de parâmetros
      if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ error: 'Invalid pagination parameters' });
      }

      const offset = (page - 1) * limit;
      const whereClause = {};
      if (category) whereClause.categoryid = category;
      if (hotelChain) whereClause.hotelchainid = hotelChain;

      const { count, rows } = await Hotel.findAndCountAll({
        where: whereClause,
        include: [
          { model: Category, as: 'category' },
          { model: HotelChain, as: 'hotelChain' },
        ],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      if (rows.length === 0) {
        return res.status(404).json({ message: 'No hotels found' });
      }

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

  // Buscar hotel por ID
  async getHotelById(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid hotel ID' });
      }

      const hotel = await Hotel.findByPk(id, {
        include: [
          { model: Category, as: 'category' },
          { model: HotelChain, as: 'hotelChain' },
        ],
      });

      if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
      res.status(200).json(hotel);
    } catch (error) {
      console.error('Error fetching hotel:', error);
      res.status(500).json({ error: 'Failed to fetch hotel' });
    }
  },

  // Buscar hotéis por nome
  async getHotelsByName(req, res) {
    try {
      const { name } = req.params;

      if (!name) {
        return res.status(400).json({ error: 'Name parameter is required' });
      }

      const hotels = await Hotel.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [
          { model: Category, as: 'category' },
          { model: HotelChain, as: 'hotelChain' },
        ],
      });

      if (hotels.length === 0) {
        return res
          .status(404)
          .json({ message: 'No hotels found with the given name' });
      }

      res.status(200).json(hotels);
    } catch (error) {
      console.error('Error fetching hotels by name:', error);
      res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  },

  async getHotelsByCategory(req, res) {
    try {
      const { category } = req.params;

      if (!category) {
        return res
          .status(400)
          .json({ error: 'Category parameter is required' });
      }

      const hotels = await Hotel.findAll({
        where: {
          categoryid: category,
        },
        include: [
          { model: Category, as: 'category' },
          { model: HotelChain, as: 'hotelChain' },
        ],
      });

      if (hotels.length === 0) {
        return res
          .status(404)
          .json({ message: 'No hotels found for the given category' });
      }

      res.status(200).json(hotels);
    } catch (error) {
      console.error('Error fetching hotels by category:', error);
      res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  },

  async getHotelsByChain(req, res) {
    try {
      const { chain } = req.params;

      if (!chain) {
        return res.status(400).json({ error: 'Chain parameter is required' });
      }

      const hotels = await Hotel.findAll({
        where: {
          hotelchainid: chain,
        },
        include: [
          { model: Category, as: 'category' },
          { model: HotelChain, as: 'hotelChain' },
        ],
      });

      if (hotels.length === 0) {
        return res
          .status(404)
          .json({ message: 'No hotels found for the given chain' });
      }

      res.status(200).json(hotels);
    } catch (error) {
      console.error('Error fetching hotels by chain:', error);
      res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  },

  // Criar novo hotel
  async createHotel(req, res) {
    try {
      const { name, categoryid, hotelchainid } = req.body;

      // Validação básica
      if (!name || !categoryid || !hotelchainid) {
        return res
          .status(400)
          .json({
            error: 'Name, category ID, and hotel chain ID are required',
          });
      }

      const hotel = await Hotel.create(req.body);
      res.status(201).json(hotel);
    } catch (error) {
      console.error('Error creating hotel:', error);
      res.status(500).json({ error: 'Failed to create hotel' });
    }
  },

  // Criar nova categoria
  async createCategory(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  },

  // Criar nova cadeia de hotéis
  async createHotelChain(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Hotel chain name is required' });
      }

      const hotelChain = await HotelChain.create(req.body);
      res.status(201).json(hotelChain);
    } catch (error) {
      console.error('Error creating hotel chain:', error);
      res.status(500).json({ error: 'Failed to create hotel chain' });
    }
  },
};

module.exports = HotelController;
