/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('blogs').del();

  await knex('blogs').insert([
    {
      author: 'John Doe',
      title: 'My first blog',
      content: 'First blog content',
    },
    {
      author: 'John Doe',
      title: 'My first blog',
      content: 'First blog content',
    },
    {
      author: 'John Doe',
      title: 'My first blog',
      content: 'First blog content',
    },
    {
      author: 'John Doe',
      title: 'My first blog',
      content: 'First blog content',
    },
    {
      author: 'John Doe',
      title: 'My first blog',
      content: 'First blog content',
    },
  ]);
};
