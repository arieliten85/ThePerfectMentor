
 const supertest = require("supertest");
 const app = require('./server');
 const api = supertest(app)
 
 describe("Endpoint Check", ()=>{
  
   test('It should return a 201 status code', async () => {
     const  response = await api.get("/api/user/stadistics")
     expect(response.statusCode).toBe(201);
     });
  
     test('It should return a Array', async () => {
      const  response = await api.get("/api/user/stadistics")
      expect(response.body).toBeInstanceOf(Array);
      
      });
 })
 
   
