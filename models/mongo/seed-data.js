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
      role: "admin",
    },
  },
  categories: {
    _model: "Category",
    city: {
      name: "City",
      slug_name: "city",
    },
    monument: {
      name: "Monument",
      slug_name: "monument",
    },
    park: {
      name: "Park",
      slug_name: "park",
    },
    restaurant: {
      name: "Restaurant",
      slug_name: "restaurant",
    },
    shopping: {
      name: "Shopping",
      slug_name: "shopping",
    },
    museum: {
      name: "Museum",
      slug_name: "museum",
    },
    landmark: {
      name: "Landmark",
      slug_name: "landmark",
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
      category: "->categories.landmark",
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
      category: "->categories.city",
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
      category: "->categories.monument",
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
      category: "->categories.monument",
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
      category: "->categories.landmark",
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
      category: "->categories.landmark",
      description:
        "The L'Arc de Triomphe is a former Roman Catholic church in Paris, France. It is located on the site of the former Roman Catholic church of Our Lady of the Apocalypse, which was dedicated to the Virgin Mary in the early sixteenth century. The church was built in the style of the Gothic Revival architecture, and was completed in the mid-sixteenth century. The church is the oldest church in the city of Paris, and is the most visited tourist attraction in the world.",
    },
    Cavan: {
      user: "->users.admin",
      name: "Cavan",
      location: {
        lat: 53.3498,
        lng: -6.2603,
      },
      category: "->categories.park",
      description:
        "Cavan is the county town of County Cavan in Ireland. The town lies in Ulster, near the border with County Fermanagh in Northern Ireland. The town is on the main N3 road that links Dublin with Enniskillen, Ballyshannon and Donegal Town.",
    },
    "The National Gallery": {
      user: "->users.admin",
      name: "The National Gallery",
      location: {
        lat: 51.50961010488236,
        lng: -0.1282346269843204,
      },
      category: "->categories.museum",
      description:
        "The National Gallery of Modern Art is a museum in London, England, dedicated to the art and history of modern art. It is the largest art museum in the United Kingdom and one of the world's most visited tourist attractions. The gallery is located in the West End of the city of London, opposite the Tower of London, and is part of the National Gallery of Art.",
      public: true,
    },
    "The Metropolitan Museum of Art": {
      user: "->users.basic1",
      name: "The Metropolitan Museum of Art",
      location: {
        lat: 40.7828,
        lng: -73.9654,
      },
      category: "->categories.museum",
      description:
        "The Metropolitan Museum of Art is a museum in New York City, New York, dedicated to the art and history of modern art. It is the largest art museum in the United States and one of the world's most visited tourist attractions. The museum is located in the West Side of Manhattan, and is part of the Metropolitan Museum of Art.",
      public: true,
    },
    "Sydney Opera House": {
      user: "->users.basic2",
      name: "Sydney Opera House",
      location: {
        lat: -33.865143,
        lng: 151.2099,
      },
      category: "->categories.landmark",
      description:
        "The Sydney Opera House is a multi-venue performing arts centre in Sydney, New South Wales, Australia. It is the largest performing arts centre in Australia and the second largest in the world. The Sydney Opera House is the largest performing arts centre in Australia and the second largest in the world. The Sydney Opera House is the largest performing arts centre in Australia and the second largest in the world.",
      public: true,
    },
    "St. Paul's Cathedral": {
      user: "->users.basic1",
      name: "St. Paul's Cathedral",
      location: {
        lat: 51.514005523132816,
        lng: -0.09837205905778874,
      },
      category: "->categories.landmark",
      description:
        "The St. Paul's Cathedral is a Roman Catholic church in London, England. It is the oldest church in the city of London, and is the second-oldest church in the United Kingdom. The church is located on the site of the former Roman Catholic church of Our Lady of the Apocalypse, which was dedicated to the Virgin Mary in the early sixteenth century.",
    },
    "The British Museum": {
      user: "->users.admin",
      name: "The British Museum",
      location: {
        lat: 51.51958011471395,
        lng: -0.12692442409459054,
      },
      category: "->categories.museum",
      description:
        "The British Museum is a museum in London, England, dedicated to the art and history of modern art. It is the largest art museum in the United Kingdom and one of the world's most visited tourist attractions. The museum is located in the West End of the city of London, opposite the Tower of London, and is part of the National Gallery of Art.",
      public: true,
    },
    "The National Gallery of Victoria": {
      user: "->users.admin",
      name: "The National Gallery of Victoria",
      location: {
        lat: -37.814,
        lng: 144.96332,
      },
      category: "->categories.museum",
      description:
        "The National Gallery of Victoria is a museum in Melbourne, Victoria, Australia. It is the largest art museum in Australia and the second largest in the world. The museum is located in the Victoria Square, and is part of the National Gallery of Victoria.",
    },
    "The Victoria and Albert Museum": {
      user: "->users.admin",
      name: "The Victoria and Albert Museum",
      location: {
        lat: -37.814,
        lng: 144.96332,
      },
      category: "->categories.museum",
      description:
        "The Victoria and Albert Museum is a museum in Melbourne, Victoria, Australia. It is the largest art museum in Australia and the second largest in the world. The museum is located in the Victoria Square, and is part of the National Gallery of Victoria.",
    },
    "St. Patrick's Cathedral": {
      user: "->users.basic2",
      name: "St. Patrick's Cathedral",
      location: {
        lat: 51.516813216270464,
        lng: -0.1329232323948637,
      },
      category: "->categories.landmark",
      description:
        "The St. Patrick's Cathedral is a Roman Catholic church in London, England. It is the oldest church in the city of London, and is the second-oldest church in the United Kingdom. The church is located on the site of the former Roman Catholic church of Our Lady of the Apocalypse, which was dedicated to the Virgin Mary in the early sixteenth century.",
    },
    "Phoenix Park": {
      user: "->users.basic1",
      name: "Phoenix Park",
      location: {
        lat: 53.36150302188553,
        lng: -6.329310414735852,
      },
      category: "->categories.park",
      description:
        "The Phoenix Park is a large urban park in Dublin, Ireland, lying 2–4 kilometres west of the city centre, north of the River Liffey. Its 11 kilometres perimeter wall encloses 707 hectares of recreational space.",
    },
    "Newgrange Tomb": {
      user: "->users.basic2",
      name: "Newgrange Tomb",
      location: {
        lat: 53.3498,
        lng: -6.2603,
      },
      category: "->categories.landmark",
      description:
        "The Newgrange Tomb is a tomb in the city of Dublin, Ireland. It is located in the Newgrange Cemetery, which is the burial place of the famous Irish monk, St. John the Baptist.",
    },
    "The National Gallery of Ireland": {
      user: "->users.admin",
      name: "The National Gallery of Ireland",
      location: {
        lat: 53.3498,
        lng: -6.2603,
      },
      category: "->categories.museum",
      description:
        "The National Gallery of Ireland is a museum in Dublin, Ireland, dedicated to the art and history of modern art. It is the largest art museum in the United Kingdom and one of the world's most visited tourist attractions. The museum is located in the West End of the city of Dublin, opposite the Tower of London, and is part of the National Gallery of Art.",
    },
    "L'Ecrivain": {
      user: "->users.basic1",
      name: "L'Ecrivain",
      location: {
        lat: 53.33619618722894,
        lng: -6.249074111109757,
      },
      category: "->categories.restaurant",
      description:
        "L'Ecrivain is a restaurant in Paris, France. It is located in the Louvre's Museum of Fine Arts, and is one of the most famous restaurants in the world.",
    },
  },
  reviews: {
    _model: "Review",
    1: {
      user: "->users.basic1",
      comment: "This is a great place to visit!",
      rating: 5,
      place: "->places.The National Gallery of Victoria",
    },
    2: {
      user: "->users.basic2",
      comment: "Didn't like the food.",
      rating: 2,
      place: "->places.L'Ecrivain",
    },
    3: {
      user: "->users.basic1",
      comment: "Family friendly.",
      rating: 4,
      place: "->places.The National Gallery of Ireland",
    },
    4: {
      user: "->users.admin",
      comment: "As an admin I can't rate this place.",
      rating: 0,
      place: "->places.Newgrange Tomb",
    },
  },
};
