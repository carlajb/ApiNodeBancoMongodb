import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/user', async (req, res) => {
  // users.push(req.body);
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});
app.get('/user', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.put('/user/:id', async (req, res) => {
  // users.push(req.body);
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

app.delete('/user/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json('Usuario deletado!');
});

app.listen(3000);
