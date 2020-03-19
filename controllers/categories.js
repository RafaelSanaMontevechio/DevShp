const init = db => {

    const category = require('../models/category')(db);
    const product = require('../models/product')(db);

    const getCategories = async (req, res) => {
        const products = await product.getProductsByCategoryId(req.params.id);
        const cat = await category.getCategoryById(req.params.id);
        res.render('category', {
            products,
            category: cat
        });
    }

    const adminGetCategories = async (req, res) => {
        const categories = await category.getCategories();
        res.render('admin/categories/index', {
            categories
        });
    }

    /** create */
    const adminCreateCategory = async (req, res) => {
        if (req.method === 'GET') {
            res.render('admin/categories/create', {
                form: {},
                errors: []
            });
        } else {
            try {
                await category.createCategory(req.body);
                res.redirect('/admin/categorias');
            } catch (err) {
                console.log(err)
                res.render('admin/categories/create', {
                    form: req.body,
                    errors: err.errors.fields
                });
            }
        }
    }

    /** editar */
    const adminUpdateCategory = async (req, res) => {
        if (req.method === 'GET') {
            const cat = await category.getCategoryById(req.params.id);
            res.render('admin/categories/update', {
                form: cat[0],
                errors: []
            });
        } else {
            try {
                await category.updateCategory(req.params.id, req.body);
                res.redirect('/admin/categorias');
            } catch (err) {
                console.log(err)
                res.render('admin/categories/update', {
                    form: req.body,
                    errors: err.errors.fields
                });
            }
        }
    }

    /** delete */
    const adminRemoveCategory = async (req, res) => {
        await category.removeCategory(req.params.id);
        res.redirect('/admin/categorias');
    }
    return {
        getCategories,
        adminGetCategories,
        adminCreateCategory,
        adminUpdateCategory,
        adminRemoveCategory
    }
}

module.exports = init 