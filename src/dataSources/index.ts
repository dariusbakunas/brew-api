import EmailSender from "./emailSender";
import db from "./db/models/index";

export interface IDataSources {
  [key: string]: object;
}

const dataSources: () => IDataSources = () => ({
  emailSender: new EmailSender(),
  db: db,
});

export default dataSources;
