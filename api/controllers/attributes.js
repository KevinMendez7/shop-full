'use strict'

module.exports = function setupCategory (AttributesModel, AttributesValueModel, ProductAttributesModel) {


  function findById (id) {
    return AttributesModel.findByPk(id);
  }

  function findValueById(attribute_id, limit){
    limit = limit || 5;
    return AttributesValueModel.findAll({
      attributes: ['attribute_value_id', 'value'],
      limit,
      include: [{
        attributes: [],
        model: AttributesModel,
        where: {
          attribute_id
        }
      }],
      raw: true
    });
  }

  function findByProductId (product_id, limit) {
    limit = limit || 5;
    return ProductAttributesModel.findAll({
      attributes: [],
      where: {
        product_id
      },
      limit,
      include: [{
        attributes: ['attribute_value_id', 'value'],
        model: AttributesValueModel,
        include: [{
          attributes: ['name'],
          model: AttributesModel
        }]
      }],
      raw: true
    });
  }

  function findAll(){
    return AttributesModel.findAll();
  }

  return {
    findById,
    findValueById,
    findByProductId,
    findAll
  }
}
