const { Op } = require('sequelize');

class HotelFilter {
  constructor(query) {
    this.query = query;
  }

  buildWhereClause() {
    const whereClause = {};

    if (this.query.name) {
      whereClause.name = { [Op.iLike]: `%${this.query.name}%` };
    }
    if (this.query.stars) {
      whereClause.stars = this.query.stars;
    }
    if (this.query.latitude) {
      whereClause.latitude = this.query.latitude;
    }
    if (this.query.longitude) {
      whereClause.longitude = this.query.longitude;
    }
    if (this.query.description) {
      whereClause.description = { [Op.iLike]: `%${this.query.description}%` };
    }
    if (this.query.address) {
      whereClause.address = { [Op.iLike]: `%${this.query.address}%` };
    }
    if (this.query.district) {
      whereClause.district = { [Op.iLike]: `%${this.query.district}%` };
    }
    if (this.query.city) {
      whereClause.city = { [Op.iLike]: `%${this.query.city}%` };
    }
    if (this.query.state) {
      whereClause.state = { [Op.iLike]: `%${this.query.state}%` };
    }
    if (this.query.country) {
      whereClause.country = { [Op.iLike]: `%${this.query.country}%` };
    }
    if (this.query.placeid) {
      whereClause.placeid = { [Op.iLike]: `%${this.query.placeid}%` };
    }
    if (this.query.categoryid) {
      whereClause.categoryid = this.query.categoryid;
    }
    if (this.query.hotelchainid) {
      whereClause.hotelchainid = this.query.hotelchainid;
    }

    return whereClause;
  }

  buildPagination() {
    const pagination = {};

    // Definindo a página (padrão: 1) e o limite (padrão: 10)
    const page = this.query.page ? parseInt(this.query.page, 10) : 1;
    const limit = this.query.limit ? parseInt(this.query.limit, 10) : 10;

    // Calculando o offset para a paginação
    pagination.offset = (page - 1) * limit;
    pagination.limit = limit;

    return pagination;
  }

  buildOrderBy() {
    const order = [];

    // Verifica se o campo de ordenação foi fornecido e se é válido
    if (this.query.orderby && this.query.sort) {
      const validFields = ['name', 'stars', 'city', 'categoryid'];
      const validSorts = ['ASC', 'DESC'];

      if (
        validFields.includes(this.query.orderby) &&
        validSorts.includes(this.query.sort.toUpperCase())
      ) {
        order.push([this.query.orderby, this.query.sort.toUpperCase()]);
      }
    }

    return order;
  }
}

module.exports = HotelFilter;
