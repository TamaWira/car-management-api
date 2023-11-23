import knex from "knex";
import jwt from "jsonwebtoken";
import { Model, NotFoundError } from "objection";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = "secret-key";
const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "postgres",
    user: "postgres",
    password: "docker",
  },
});

interface IParams {
  id: string;
}

Model.knex(knexInstance);

class Auth {
  constructor() {}

  async authorizeSuperadmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const tokenPayload = jwt.verify(token, SECRET_KEY || "Rahasia");

    if (tokenPayload.user[0].role !== "superadmin") {
      return res.status(403).json({
        message: "Access denied.",
        success: false,
        code: 403,
      });
    }

    next();
  }

  async authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const tokenPayload = jwt.verify(token, SECRET_KEY || "Rahasia");

    if (tokenPayload.user[0].role === "member") {
      return res.status(403).json({
        message: "Access denied.",
        success: false,
        code: 403,
      });
    }

    next();
  }
}

export default new Auth();
