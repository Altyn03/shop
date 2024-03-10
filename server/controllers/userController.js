const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcryptjs");
const tokenService = require("../middleware/token.service");

class UserController {
    async signUp(req, res, next) {
        try {
            const { email, password, image, licence, name, sex, telegram } =
                req.body;

            if (!email || !password) {
                return next(
                    ApiError.badRequest("Некорректный email или пароль")
                );
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS"
                    }
                });
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const newUser = await User.create({
                email,
                password: hashPassword,
                role: email === "altynov.00@gmail.com" ? "ADMIN" : "USER",
                image,
                licence,
                name,
                sex,
                telegram
            });

            const tokens = tokenService.generateJWT({ id: newUser.id });
            await tokenService.save(newUser.id, tokens.refreshToken);

            return res.json({
                ...tokens,
                userId: newUser.id,
                user: newUser
            });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async signInWithPassword(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "INVALID_EMAIL"
                    }
                });
            }

            let comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "INVALID_PASSWORD"
                    }
                });
            }
            const tokens = tokenService.generateJWT({ id: user.id });
            await tokenService.save(user.id, tokens.refreshToken);

            return res.json({ ...tokens, userId: user.id });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refresh_token: refreshToken } = req.body;
            const data = tokenService.validateRefresh(refreshToken);
            const dbToken = await tokenService.findToken(refreshToken);
            if (!data || !dbToken || data.id !== dbToken?.userId) {
                next(ApiError.badRequest("Unauthorized"));
            }

            const tokens = tokenService.generateJWT({ id: data.id });
            await tokenService.save(data.id, tokens.refreshToken);

            return res.json({ ...tokens, userId: data.id });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getUserData(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest("Пользователь не найден"));
            }
            const user = await User.findOne({ where: { id } });
            return res.json({ user });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async updateUserData(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest("Пользователь не найден"));
            } else if (req.user.id != id) {
                return next(ApiError.badRequest("Вы не этот пользователь"));
            }

            await User.update({ image: req.body?.image }, { where: { id } });

            return res.json("Пользователь успешно изменен");
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new UserController();
