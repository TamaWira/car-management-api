import { Router } from "express";
import ControllerAuth from "../../controllers/api/ControllerAuth";
import Auth from "../../middlewares/Auth";

class ApiAuth {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", ControllerAuth.getUsers);
    this.router.post("/login", ControllerAuth.login);
    this.router.post(
      "/registerMember",
      Auth.authorizeAdmin,
      ControllerAuth.registerUser
    );
    this.router.post(
      "/registerAdmin",
      Auth.authorizeSuperadmin,
      ControllerAuth.registerUser
    );

    // /api/auth/login
    // /api/auth/register => daftarkan member
    // /api/auth/registerAdmin => daftarkan admin oleh superadmin

    // this.router.post("/login", Auth.authorize, ControllerLogin.login);
    // this.router.get('/:id', Auth.authorize, ControllerBooks.show);
    // this.router.post('/', Auth.authorize, ControllerBooks.create);
    // this.router.put('/:id', Auth.authorize, ControllerBooks.update);
    // this.router.delete('/:id', Auth.authorize, ControllerBooks.remove);

    return this.router;
  }
}

export default new ApiAuth();
