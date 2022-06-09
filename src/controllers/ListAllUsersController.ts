import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllUsersService } from "../services/ListAllUsersService";

class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllUsersService = container.resolve(ListAllUsersService)

    const users = await listAllUsersService.execute();

    return response.json(users);
  }
}

export { ListAllUsersController };
