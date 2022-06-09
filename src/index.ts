import { app } from './app'
import { AppDataSource } from './db/data-source';

AppDataSource.initialize().then(() => {
  console.log("MongoDB is working")
}).catch(error => console.log(error))

const port = process.env.PORT || 3000

app.listen(port, () => console.log("Server is running"));