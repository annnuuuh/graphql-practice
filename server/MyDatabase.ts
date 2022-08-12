import { SQLDataSource } from "datasource-sql";

export default class MyDatabase extends SQLDataSource {
  fetchState(stateName: string) {
    return this.knex.select("*").from("states").where({ name: stateName });
  }

  getActiveStates() {
    return this.knex.select("*").from("states").where({ isActive: true });
  }

  getActiveCounties(id: any) {
    return this.knex
      .select("*")
      .from("counties")
      .where({ stateId: id, isActive: true });
  }

  getCities(id: any) {
    return this.knex.select("*").from("cities").where({ countyId: id });
  }

  getPropertyRequirements(id: any) {
    return this.knex.select("*").from("requirements").where({ id: id });
  }
}
