const express = require('express');
const { Op } = require('sequelize');
const Hotel = require('./models/Hotel');

const router = express.Router();

// Rota para listar hotéis com filtro, categorização e paginação
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = category ? { category } : {};

    const { count, rows } = await Hotel.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      data: rows,
      meta: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

module.exports = router;
