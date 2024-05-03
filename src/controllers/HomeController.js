class HomeController {
    home(req, res, next) {
        return res.status(200).json({
            message: 'Rota inicial da API',
        });
    }
}

export default new HomeController();
