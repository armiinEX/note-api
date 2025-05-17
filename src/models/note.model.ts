import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DataType
} from 'sequelize-typescript';

@Table({ tableName: 'notes' })
export class Note extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  title!: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  content!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
