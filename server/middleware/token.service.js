const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

class TokenService {
    generateJWT(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY);

        return {
            accessToken,
            refreshToken,
            expiresIn: 3600
        };
    }

    async save(userId, refreshToken) {
        const [token, created] = await Token.findOrCreate({
            where: { userId },
            defaults: { refreshToken }
        });

        if (!created) {
            const token = await Token.update(
                { refreshToken: refreshToken },
                { where: { userId } }
            );
            return token;
        }

        return token;
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        } catch (error) {
            return "INVALID_REFRESH_TOKEN";
        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
        } catch (error) {
            return error;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (error) {
            return "TOKEN_IS_NIT_FINED_IN_DB";
        }
    }
}

module.exports = new TokenService();
