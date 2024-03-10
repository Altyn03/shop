const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductsController {
    async createProduct(req, res, next) {
        try {
            const { title, price, description, category, image, rating } =
                req.body;
            const product = await Product.create({
                title,
                price,
                description,
                category,
                image,
                rating
            });
            return res.json(product);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest(error.message));
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await Product.findAll();
            return res.json(products);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id }
            });
            return res.json(product);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new ProductsController();
