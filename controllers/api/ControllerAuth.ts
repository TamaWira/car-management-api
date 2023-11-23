import knex from "knex";
import jwt from "jsonwebtoken";
import { Model } from "objection";
import { Request, Response } from "express";
import { UsersModel } from "../../models/Users";

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

class ControllerAuth {
  constructor() {}

  async getUsers(req: Request, res: Response) {
    const users = await UsersModel.query();
    res.status(200).json({
      meta: {
        message: "success",
        success: true,
        code: 200,
      },
      data: users,
    });
  }

  async login(req: Request, res: Response) {
    const loginCredentials = req.body;
    const users = await UsersModel.query();
    const user = users.filter((user) => {
      return (
        user.username === loginCredentials.username &&
        user.password === loginCredentials.password
      );
    });

    if (user.length === 0) {
      res.status(400).json({
        message: "Login Failed",
      });

      return;
    }

    const token = jwt.sign({ user }, SECRET_KEY || "secret-key");

    res.status(201).json({
      meta: {
        message: "Success",
        success: true,
        code: 201,
      },
      data: token,
    });
  }

  async registerUser(req: Request, res: Response) {
    const users = await UsersModel.query().insert(req.body).returning("*");
    res.status(200).json({
      message: "Register member success!",
      data: users,
    });
  }
}

export default new ControllerAuth();
