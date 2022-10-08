import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { ListInstance } from "./list";

//cREATE AN INTERFACE FOR THE APP

interface UserAttribute {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
}

//Creat a new instance of the class and start using it
export class UserInstance extends Model<UserAttribute> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true, //In any sql database, the id is always the primary key
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "fullname is required",
        },
        notEmpty: {
          msg: "please provide a valid name ",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "email is required",
        },
        isEmail: {
          msg: "please provide a valid email",
        },
      },
    },

    phoneNumber: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "phone number is required",
        },
        notEmpty: {
          msg: "please provide a valid number ",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required",
        },
        notEmpty: {
          msg: "please provide a password ",
        },
      },
    },
  },
  {
    //This shows that we are building db and the type of table
    sequelize: db,
    tableName: "user",
  }
);
//code to relate the user and the list, put these two lines of code together  in userdatail
UserInstance.hasMany(ListInstance, { foreignKey: "userId", as: "list" }); //the allias has to rhyme with the list instance
ListInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "user" });
