import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log(request.body);
    
    const { email, first_name, last_name, gender, birthdate, phone } = request.body;

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({
      email, first_name, last_name, gender, birthdate, phone
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
