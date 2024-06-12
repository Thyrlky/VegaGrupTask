import ObjectID from 'bson-objectid'
export class User {
  //Unique BsonID
  userID?: string = new ObjectID().toString()

  username?: string
  name?: string
  surname?: string
  email?: string
  year?: number

  //Extra
  maskedYear?: string

  createdAt?: string
  updatedAt?: string
}
