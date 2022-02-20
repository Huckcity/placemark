export default {
  users: {
    _model: "User",
    basic1: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@email.com",
      password: "test",
    },
    basic2: {
      firstName: "Jane",
      lastName: "Doe",
      username: "janedoe",
      email: "janedoe@email.com",
      password: "test",
    },
    admin: {
      firstName: "Adam",
      lastName: "Gibbons",
      username: "adamg",
      email: "adam.p.gibbons@gmail.com",
      password: "test",
      isAdmin: true,
    },
  },
  places: {
    _model: "Place",
    timesSquare: {
      user: "->users.basic1",
      name: "Times Square",
      location: {
        lat: 40.758896,
        lng: -73.98513,
      },
      description:
        "The Times Square is a major commercial, entertainment, and research center in New York City, located between the Hudson River and the West Side. It is the most visited tourist destination in the United States, attracting more than 3.5 million visitors annually, making it the most visited commercial area in the world. The Times Square is the best-known landmark in New York City, and one of the city's most recognizable landmarks. It is often referred to as the 'Financial District of New York City' and the 'Financial District of New York City', and is referred to as the 'Financial District' in the United States. It is also commonly referred to as the 'Financial District of New York City' and the 'Financial District of New York City', and is referred to as the 'Financial District' in the United States.",
    },
    newYorkCity: {
      user: "->users.basic1",
      name: "New York City",
      location: {
        lat: 40.714353,
        lng: -74.005973,
      },
      description:
        "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, the densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building, sprawling Central Park, and the sprawling Terminal Building. Broadway theater is staged in neon-lit Times Square.",
    },
    statueOfLiberty: {
      user: "->users.basic2",
      name: "Statue of Liberty",
      location: {
        lat: 40.689249,
        lng: -74.0445,
      },
      description:
        "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue was designed by French sculptor Frédéric Auguste Bartholdi and his son, Gérard Bartholdi. The statue was built in France in 1848 as part of an effort to escape French control of the area. The statue is located on Liberty Island in New York.",
    },
    EiffelTower: {
      user: "->users.basic1",
      name: "Eiffel Tower",
      location: {
        lat: 48.85837,
        lng: 2.294481,
      },
      description:
        "The Eiffel Tower is a wrought iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. The Eiffel Tower is 324 m (1,063 ft) tall, and stands a total of 324 m (1,063 ft) above the ground. The tower has become a global cultural icon of France and one of the most recognisable landmarks in the world. The Eiffel Tower is France's most visited tourist attraction, and has been described as the best example of French engineering and architecture.",
    },
    BrooklynBridge: {
      user: "->users.basic2",
      name: "Brooklyn Bridge",
      location: {
        lat: 40.705786,
        lng: -73.996494,
      },
      description:
        "The Brooklyn Bridge is a hybrid cable-stayed/suspension bridge spanning the River Thames in New York City, New York, on the north bank of the Hudson River. It is the second-longest span of the New York City Bridge System, after the Manhattan Bridge. The Brooklyn Bridge is one of the most photographed bridges in the world. The bridge was completed in 1883 and is the second-longest span of the New York City Bridge System, after the Manhattan Bridge.",
    },
    "L'Arc de Triomphe": {
      user: "->users.basic2",
      name: "L'Arc de Triomphe",
      location: {
        lat: 48.873792,
        lng: 2.295028,
      },
      description:
        "The L'Arc de Triomphe is a former Roman Catholic church in Paris, France. It is located on the site of the former Roman Catholic church of Our Lady of the Apocalypse, which was dedicated to the Virgin Mary in the early sixteenth century. The church was built in the style of the Gothic Revival architecture, and was completed in the mid-sixteenth century. The church is the oldest church in the city of Paris, and is the most visited tourist attraction in the world.",
    },
  },
};
