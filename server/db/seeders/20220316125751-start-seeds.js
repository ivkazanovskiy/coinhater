module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Artists', [
      {
        name: 'Гречка',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'дора',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Алёна Швец',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    await queryInterface.bulkInsert('Songs', [
      {
        artistId: 1,
        name: 'Меня нет',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        artistId: 1,
        name: 'Люби меня люби',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        artistId: 2,
        name: 'Дорадура',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        artistId: 2,
        name: 'Втюрилась',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        artistId: 3,
        name: 'Мальчики не плачут',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        artistId: 3,
        name: 'Вино и сигареты',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
    await queryInterface.bulkDelete('Artists', null, {});
  },
};
