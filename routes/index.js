const init = db => {
    const home = require('../controllers/home');
    const auth = require('../controllers/auth');

    const categoriesRouter = require('./categories');
    const productsRouter = require('./products');

    const router = require('express').Router();

    router.get('/', home.getIndex);

    router.post('/login', auth.login(db));
    router.get('/logout', auth.logout);

    router.use('/categoria', categoriesRouter(db));
    router.use('/produto', productsRouter(db));

    return router
}

module.exports = init 