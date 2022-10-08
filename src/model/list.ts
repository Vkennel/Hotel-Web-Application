import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

//cREATE AN INTERFACE FOR THE APP

interface ListAttribute {
  id: string;
  image: string;
  address: string;
  price: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
  userId: string;
}

//Creat a new instance of the class and start using it
export class ListInstance extends Model<ListAttribute> {}

ListInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true, //In any sql database, the id is always the primary key
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    numOfBeds: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    numOfBaths: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    rating:{
        type: DataTypes.NUMBER,
        allowNull:false,
    },
    userId:{
      type: DataTypes.STRING,
    }
  },
  {
    //This shows that we are building db and the type of table
    sequelize: db,
    tableName: "list",
  }
);
