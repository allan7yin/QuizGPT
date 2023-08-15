import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MqResponse {
  @PrimaryGeneratedColumn()
  correlationId: String;

  @Column()
  response: String;

  constructor(correlationId: String, response: String) {
    this.correlationId = correlationId;
    this.response = response;
  }
}
