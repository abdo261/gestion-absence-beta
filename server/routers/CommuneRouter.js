const CommuneRouter = require("express").Router();
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/communeController");
const isAuth = require("../middlewares/isAuthenticated");

/**
 * @method POST
 * @route /api/communes
 * @access private (admin)
 * @descreption create commune 
 */
CommuneRouter.post("/", isAuth, create);
/**
 * @method GET
 * @route /api/communes
 * @access private (admin)
 * @descreption get all communes
 */
CommuneRouter.get("/", isAuth, getAll);
/**
 * @method GET
 * @route /api/communes/:id
 * @access private (admin)
 * @descreption get commune by id
 */
CommuneRouter.get("/:id", isAuth, getById);
/**
 * @method PUT
 * @route /api/communes/:id
 * @access private (admin)
 * @descreption update commune
 */
CommuneRouter.put("/:id", isAuth, update);
/**
 * @method DELETE
 * @route /api/communes/:id
 * @access private (admin)
 * @descreption delete commune
 */
CommuneRouter.delete("/:id", isAuth, remove);

module.exports = CommuneRouter;
