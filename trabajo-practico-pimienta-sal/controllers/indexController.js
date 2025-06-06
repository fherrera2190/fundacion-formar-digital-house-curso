const menu = require('../data/menu.json');
module.exports = {
    index: (req, res) => {
        return res.render('index', { items: menu });
    },
    detail: (req, res) => {
        const id = +req.params.id;
        const item = menu.find((item) => item.id === id);
        return res.render('detalleMenu', { item });
    }
}