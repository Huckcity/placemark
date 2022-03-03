const baseController = {
  index: {
    auth: false,
    handler: async (req, h) => h.view("index"),
  },
};

export default baseController;
