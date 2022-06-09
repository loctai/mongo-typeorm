import { Router } from "express";

import { ListAllUsersController } from "../controllers/ListAllUsersController";
import { FindUserController } from "../controllers/FindUserController";
import { CreateUserController } from "../controllers/CreateUserController";
import { CreateUserMedicalHistoryController } from "../controllers/CreateUserMedicalHistoryController";

const listAllUsersController = new ListAllUsersController();
const findUserController = new FindUserController();
const createUserController = new CreateUserController();
const createUserMedicalHistoryController = new CreateUserMedicalHistoryController();

const userRoutes = Router();

userRoutes.get("/", listAllUsersController.handle);
userRoutes.get("/:email", findUserController.handle);

userRoutes.post("/", createUserController.handle);
userRoutes.post("/:user_id/medical-history", createUserMedicalHistoryController.handle);

export { userRoutes };
