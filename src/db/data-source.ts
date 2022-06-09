import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { UserMedicalHistory } from "../entities/UserMedicalHistory"

const testing = process.env.NODE_ENV === 'test';
const url = testing ? process.env.MONGO_DB_TEST_URL : process.env.MONGO_DB_URL;

export const AppDataSource = new DataSource({
    type: "mongodb",
    url,
    synchronize: true,
    logging: false,
    useUnifiedTopology: true,
    entities: [User, UserMedicalHistory],
    migrations: [],
    subscribers: [],
})
