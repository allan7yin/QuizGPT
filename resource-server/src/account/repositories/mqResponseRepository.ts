import dataSource from "../../../config/ormconfig";
import { MqResponse } from "../entities/mqResponse";

export const MqResponseRepository = dataSource.getRepository(MqResponse);
