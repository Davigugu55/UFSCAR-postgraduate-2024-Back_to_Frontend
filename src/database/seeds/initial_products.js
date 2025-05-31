/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('products').del();

  await knex('products').insert([
    {
      id: '23',
      name: 'Produto 23',
      description: 'Descrição do Produto 23',
      price: 100.00,
      stock: 10,
      image_url: 'teste.com/23'
    },
    {
      id: '24',
      name: 'Produto 24',
      description: 'Descrição do Produto 24',
      price: 200.00,
      stock: 5,
      image_url: 'teste.com/24'
    },
  ]);
};

