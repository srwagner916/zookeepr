const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
  } = require('../lib/zookeepers.js');
  const { zookeepers } = require('../data/zooKeepers');
const { TestScheduler } = require('@jest/core');

  jest.mock('fs');

test('creates a new zookeeper object', () => {
  const zookeeper = createNewZookeeper(
    { name: "Stace", id: "jjjttt123" },
    zookeepers
  )

  expect(zookeeper.name).toBe('Stace');
  expect(zookeeper.id).toBe('jjjttt123');
});

test('filters by query', () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Stace",
      age: 25,
      favoriteAnimal: "dolphin"
    },
    {
      id: "4",
      name: "Bob",
      age: 27,
      favoriteAnimal: "turkey"
    }
  ]

  const updatedZookeepers = filterByQuery({ age: 25 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Stace",
      age: 25,
      favoriteAnimal: "dolphin",
    },
    {
      id: "4",
      name: "Bob",
      age: 27,
      favoriteAnimal: "turkey",
    },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Stace");
});

test('validates age', () => {
  const zookeeper = {
    id: "3",
    name: "Stace",
    age: 25,
    favoriteAnimal: "dolphin",
  };

  const invalidZookeeper = {
    id: "4",
    name: "Bob",
    age: "27",
    favoriteAnimal: "turkey",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});