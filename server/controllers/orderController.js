const { Order } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
    async createOrder(req, res, next) {
        try {
            const { priceOrder, userId, products, created_at } = req.body;
            if (req.user.id != userId) {
                return next(ApiError.badRequest("Вы не этот пользователь"));
            }
            const order = await Order.create({
                priceOrder,
                userId,
                products,
                created_at
            });
            return res.json(order);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getUserOrders(req, res, next) {
        try {
            const { id } = req.params;
            if (req.user.id != id) {
                return next(ApiError.badRequest("Вы не этот пользователь"));
            }
            const orders = await Order.findAll({
                where: { userId: Number(id) }
            });
            return res.json(orders);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new OrderController();
