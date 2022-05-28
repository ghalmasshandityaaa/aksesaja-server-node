/**
 * Where to import Services
 */
// const ProductService = require('../services/product.service');

/**
 * Where to import Schema
 */
// const ProductSchema = require('../schema/product.schema');

/**
 * Where to import Models
 */
import { Users } from '../models/users';

export class UserService {
  constructor() { } // private readonly companyService: CompanyService,

  static async getAllUsers() {
    try {
      const getUsers = await Users.createQueryBuilder('users').getMany();

      return getUsers;
    } catch (e) {
      console.error({ service: 'UserController.getAllUsers', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
