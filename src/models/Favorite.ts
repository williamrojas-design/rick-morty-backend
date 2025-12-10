import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { User } from "./User";

@Table({ tableName: "favorites", timestamps: true })
export class Favorite extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  rickMortyCharId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER, 
    allowNull: false
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}