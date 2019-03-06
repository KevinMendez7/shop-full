'use strict'

const Sequelize = require('sequelize')

module.exports = function setupProduct (ProductModel, ProductCategoryModel, 
                                        CategoryModel, DepartmentModel, 
                                        ReviewModel, CustomerModel) {

  async function findById (req, res) {
    const { params: { id } } = req;

    const result = await ProductModel.findByPk(id);

    res.status(200).send(result);
  }

  async function findByIdDetails (req, res) {
    const { params: { product_id } } = req;

    const result = await ProductModel.findAll({
      attributes: ['product_id', 'name', 'description', 'price', 
      'discounted_price', 'image', 'image_2'],
      where : {
        product_id
      }
    });

    res.status(200).send(result);
  }


  async function findByDepartment (req, res) {
    const { params: { product_id } } = req;

    const limit = 20;
    const tmp = await ProductCategoryModel.findAll({
      attributes: ['category.category_id', [Sequelize.col('category.name'), 'category_name'],
      ],
      include: [{
        attributes: [],
        model: ProductModel,
        where: {
          product_id
        },
      },
      {
        attributes: [],
        model: CategoryModel,
        include: [{
          attributes: [
          [Sequelize.col('name'), 'department_name']
          ],
          model: DepartmentModel
        }]
      }],
      raw: true
    });

    const pattern = /category.department./ig;
    const result = JSON.parse(JSON.stringify(tmp).replace(pattern, ''))


    res.status(200).send(result);
  }

  async function findAll(req, res){
    const limit = 20;
    const rows = await ProductModel.findAll({
        attributes: ['product_id', 'name', 'description', 'price', 
        'discounted_price', 'thumbnail'],
        limit,
        raw: true
    });
    const [ { count } ] = await ProductModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      limit,
      raw: true
    });

    const result = {
      count,
      rows
    }

    res.status(200).send(result);
  }

  async function findByCategoryId (req, res) {
    const { params: { category_id } } = req;

    const limit = 20;
    const [ { count } ] = await ProductCategoryModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      where: {
        category_id
      },
      limit,
      include: [{
        attributes: [],
        model: ProductModel
      }],
    raw: true
    });
    const rows = await ProductCategoryModel.findAll({
      attributes: ['product.product_id', 'product.name', 'product.description', 'product.price', 
      'product.discounted_price', 'product.thumbnail'],
      where: {
        category_id
      },
      limit,
      include: [{
        attributes: [],
        model: ProductModel
      }],
      raw: true
    });

    const result = {
      count,
      rows
    }

    res.status(200).send(result);
  }

  async function findByReview (req, res) {
    const { params: { product_id } } = req;

    const limit = 20;
    const result = await ReviewModel.findAll({
      attributes: ['customer.name','review', 'rating', 'created_on'],
      limit,
      include: [{
        attributes: [],
        model: ProductModel,
        where: {
          product_id
        }},
        {
        attributes: [],
        model: CustomerModel
        }
      ],
      raw: true
    });


    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({message: 'This product has not reviews'})
    }
  }

  async function createReview (req, res) {
    const { params: { product_id } } = req;
    const { customer: { sub } } = req;
    const review = new ReviewModel();
    const { body } = req;

        review.customer_id = sub;
        review.product_id = product_id;
        review.review = body.review;
        review.rating = body.rating;
        review.created_on = new Date();

    const result = await review.save(review);  
    
    console.log(result);

    res.status(200).send(review);
  }

  async function findByDepartmentId (req, res) {
    const { params: { department_id } } = req;

    const limit = 20;
    const [ { count } ] = await ProductCategoryModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      limit,
      include: [{
        attributes: [],
        model: ProductModel
      },
      {
        attributes: [],
        model: CategoryModel,
        where: {
          department_id
        }
      }],
    raw: true
    });
    const rows = await ProductCategoryModel.findAll({
      attributes: ['product.product_id', 'product.name', 'product.description', 'product.price', 
      'product.discounted_price', 'product.thumbnail'],
      include: [{
        attributes: [],
        model: ProductModel
      },
      {
        attributes: [],
        model: CategoryModel,
        where: {
          department_id
        }
      }],
      raw: true
    });

    const result = {
      count,
      rows
    }

    res.status(200).send(result);
  }

  return {
    findAll,
    findById,
    findByCategoryId,
    findByDepartmentId,
    findByDepartment,
    findByIdDetails,
    findByReview,
    createReview
  }
}
