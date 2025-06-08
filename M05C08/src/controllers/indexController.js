const { validationResult } = require('express-validator')
module.exports = {

    index: (req, res) => {
        res.render('index', { title: 'Login Form', userBackground: "darkgray" })
    },
    test: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            req.session.userLogin = {
                name: req.body.name.trim(),
                email: req.body.email.trim(),
                age: req.body.age === "" ? undefined : +req.body.age,
                color: req.body.color.trim()
            }
            req.body.checkbox !== undefined && res.cookie('userLogin', req.session.userLogin, {
                maxAge: 1000 * 60
            });
            return res.redirect('/');
        } else {
            return res.render('index', { title: 'Passed', userBackground: "darkgrey", errors: errors.mapped(), old: req.body })
        }
    },
    otraVista: (req, res) => {
        res.render('otraVista', { title: 'Otra Vista' });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userLogin');
        res.redirect('/');
    }
}