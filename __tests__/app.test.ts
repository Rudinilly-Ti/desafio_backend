import IReturnKeysDTO from '../src/modules/keys/dtos/IReturnKeysDTO';
import { createConnection , getConnection } from 'typeorm';
import express, { Request ,Response, NextFunction } from 'express';
import '../src/shared/container';
import 'express-async-errors';
import AppError from '../src/shared/errors/AppError';
import routes from '../src/shared/infra/http/routes/routes';
import request from 'supertest';

require("dotenv").config({
  path: process.env.NODE_ENV == 'test' ? ".env.test" : ".env"
});

const app = express();
app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, Next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message
      })
    }
    console.log(err)
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
      })
  });

beforeAll(async ()=> {
  await createConnection();
});

afterAll(async () => {
  const connection = getConnection();
  await connection.close();

});

describe('Rotas de usuario', () => {
  it('Deve criar dois usuários', async () => {
    const first = {
      nome: "Joao Felipe",
      telefone:"(88) 88888-9999"
    };
    await request(app).post('/user/createUser').send(first).expect(200, {
      ...first,
      id: 1
    })

    const second ={
      nome: "Luis Ricardo",
      telefone:"(88) 99999-8888"
    };
    await request(app).post('/user/createUser').send(second).expect(200, {
      ...second,
      id: 2
    })
  });
});

describe('Rotas das chaves', () => {
  it('Deve criar 3 chaves diferentes para o primeiro usuario e duas chaves para o segundo usuario', async () => {
    //CHAVES DO USUARIO 1
    const first = {
      valor: "904.434.231-43",
      user: 1
    };
    const second = {
      valor: "minhakey@minhakey.com",
      user: 1
    };
    const third = {
      valor: "minhachavesecreta",
      user: 1
    };
    await request(app).post('/key/createKey').send(first).expect(200, {
      ...first,
      id: 1
    });
    await request(app).post('/key/createKey').send(second).expect(200, {
      ...second,
      id: 2
    });
    await request(app).post('/key/createKey').send(third).expect(200, {
      ...third,
      id: 3
    });
    //CHAVES DO USUARIO 2
    const first1 = {
      valor: "939.343.21-89",
      user: 2
    };
    const second1 = {
      valor: "chave@chave.com",
      user: 2
    };
    await request(app).post('/key/createKey').send(first1).expect(200, {
      ...first1,
      id: 4
    });
    await request(app).post('/key/createKey').send(second1).expect(200, {
      ...second1,
      id: 5
    });
  });

  it('Deve retornar uma mansagem de chave já cadastrada', async () => {
    const key = {
      valor: "chave@chave.com",
      user: 2
    };

    await request(app).post('/key/createKey').send(key).expect(401, {
      status: "error",
      message: "Key already exists."
    });
  });

  it('Deve retornar uma mansagem de limite de chaves do usuario atingido', async () => {
    const key = {
      valor: "904.434.231-43",
      user: 1
    };

    await request(app).post('/key/createKey').send(key).expect(401, {
      status: "error",
      message: "Max number of keys reached."
    });
  });

  it('Deve atualizar o valor de uma chave', async () => {
    const key = {
      id: 1,
      valor: "904.434.231-47"
    }

    await request(app).put('/key/updateKey').send(key).expect(200, {
      ...key,
      id: 1
    })
  })

  it('Deve buscar todas as chaves do primeiro usuario', async () => {
    await request(app).get('/key/mykeys').send({ user_id: 1 }).expect(200).then(response => {
      expect(response.body.length).toBe(3);
    });
  });

  it('Deve cadastrar uma chave para o segundo usuario e depois deletá-la', async () => {
    const key = {
      valor: "vou ser deletada",
      user: 2
    };

    let id;
    await request(app).post('/key/createKey').send(key).expect(200).then(response => id = response.body.id);

    await request(app).delete('/key/deleteKey').send({ key_id: id }).expect(200).then(response => {
      expect(response.body.message).toBe("Key deleted.");
    })
  })
});

describe('Rota das transações', () => {
  it('Deve criar uma transação pagador(usuario 1 com a chave 2), recebedor(usuario 2 com a chave 4)', async () => {
    const trans = {
      valor: 59,
	    payer: 2,
	    receiver: 4
    };

     await request(app).post('/transaction/createTransaction').send(trans).expect(200, {
       ...trans,
       id: 1
     });
  });

  it('Deve retornar um erro de valor não autorizado', async () => {
    const trans = {
      valor: 0,
	    payer: 2,
	    receiver: 4
    };

    await request(app).post('/transaction/createTransaction').send(trans).expect(400, {
      status: "error",
      message: "Value not allowed."
    });
  });
});
