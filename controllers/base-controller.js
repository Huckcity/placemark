const baseController = {
  index: {
    auth: false,
    handler: async (req, h) => {
      return h.view("index");
    },
  },
};

export default baseController;
