module.exports = {
    index:
        function (req, res, next) {
            return res.render('index');
        }
    ,
    about: (req, res) => res.render('about')
}