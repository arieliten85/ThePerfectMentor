
const mongoose = require("mongoose")
const User = require("../models/User");
const supertest = require("supertest");
const { app, servidor } = require('../server');
const api = supertest(app)

const initialUsers = [
  {
    name: "Mauro",
    email: "mauro@correo.com",
    password: "654321",
    age: "36",


    
    rol: "Mentor"

  },
  {
    name: "Pablo",
    email: "pablo@correo.com",
    password: "123456",
    age: "26",
    rol: "Mentee"

  },
]

beforeEach(async () => {
  await User.deleteMany({})
  const user01 = new User(initialUsers[0])

  await user01.save()

  const user02 = new User(initialUsers[1])
  await user02.save()
})

describe("Endpoint Check", () => {

  test('It should return a 201 status code', async () => {
    const response = await api.get("/api/user/stadistics")
    console.log(response.body)
    expect(response.statusCode).toBe(201);
  });

  test('It should return a the length of the users array', async () => {
    const response = await api.get("/api/user/stadistics")
    console.log(response.body.length)
    expect(response.body).toHaveLength(initialUsers.length);

  });

  test('You should return the corresponding mail', async () => {
    const response = await api.get("/api/user/stadistics")
    const email = response.body.map(email => email.email)
    console.log(email)
    expect(email).toContain("pablo@correo.com");

  });

  test('It should return a 400 error, if the user does not exist.', async () => {
    const id = "64651ab0a20273bc526c5535"
    const response = await api.delete(`/api/user/delete/${{ _id: id}}`)
    expect(response.statusCode).toBe(400);

  })

  test('I should delete the first user', async () => {
    const res = await api.get("/api/user/stadistics")
    const userToDelete = res.body[0]
    const response = await api.delete(`/api/user/delete/${userToDelete._id}`)
    expect(response.statusCode).toBe(204);

  });


})


afterAll(() => {
  mongoose.connection.close()
  servidor.close()
})