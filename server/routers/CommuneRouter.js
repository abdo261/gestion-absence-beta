const CommuneRouter = require("express").Router();
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/communeController");
const isAuth = require("../middlewares/isAuthenticated");

CommuneRouter.post("/", isAuth, create);
CommuneRouter.get("/", isAuth, getAll);
CommuneRouter.get("/:id", isAuth, getById);
CommuneRouter.put("/:id", isAuth, update);
CommuneRouter.delete("/:id", isAuth, remove);

module.exports = CommuneRouter;
