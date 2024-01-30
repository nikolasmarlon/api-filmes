module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default", // para gerar o token
        expiresIn: "1d",
    }
}