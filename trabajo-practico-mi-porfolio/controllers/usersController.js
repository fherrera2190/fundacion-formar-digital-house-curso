const users = require('../Data/user.json');
// console.log(users)
module.exports = {
    index: (req, res) => {
        return res.render('users', {
            users
        });
    },
    profile: (req, res) => {
        const id = +req.params.id;
        console.log(id)
        const user = users.find(user => user.id === +req.params.id);
        return res.render('profile', { user })
    }
}