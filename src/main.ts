import PostgresqlConnectionAdapter from "./infra/database/postgresql-connection-adapter";
import DatabaseRepositoryFactory from "./infra/factory/database-repository-factory";
import ExpressHttp from "./infra/http/express-http";
import HappiHttp from "./infra/http/hapi-http";
import Router from "./infra/http/router";

const connection = new PostgresqlConnectionAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const http = new ExpressHttp();
const router = new Router(http, repositoryFactory, connection);
router.init();
http.listen(3002);
