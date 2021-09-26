import { createConnection , getConnection } from 'typeorm';
import express from 'express';
import routes from "../src/routes";
import request from 'supertest';

require("dotenv").config({
  path: process.env.NODE_ENV == 'test' ? ".env.test" : ".env"
});

const app = express();
app.use(express.json());
app.use(routes);

beforeAll(async ()=> {
  await createConnection();
});

afterAll(async () => {
  const connection = await getConnection();
  await connection.close();

});

describe('Rotas de usuario', () => {
  it('Deve criar dois usuários', async () => {
    const first = {
      nome: "Joao Felipe",
      telefone:"(88) 88888-9999"
    };    
    await request(app).post('/createUser').send(first).expect(200, {
      ...first,
      id: 1
    })
    
    const second ={
      nome: "Luis Ricardo",
      telefone:"(88) 99999-8888"
    };
    await request(app).post('/createUser').send(second).expect(200, {
      ...second,
      id: 2
    })
  });

  it('Deve atualizar o numero de telefone do primeiro usuario', async () => {
   
    const user = {
      nome:"Joao Felipe",
      telefone:"(84) 88888-9999"
    }

    await request(app).post(`/updateUser/1`).send(user).expect(200, {
      ...user,
      id: 1,
    });
  });

  it('Deve buscar todos os usuarios', async () => {
    await request(app).get('/users').expect(200).then(response => {
      expect(response.body.length).toBe(2);
    })
  });

  it('Deve buscar o segundo usuario', async () => {
    await request(app).get('/user/2').expect(200).then(response => {
      expect(response.body.nome).toBe("Luis Ricardo");
    })
  });

  it('Deve criar um novo usuario e deletá-lo', async () => {
    const user = {
      nome: "Vou ser deletado",
      telefone:"(xx) xxxxx-xxxx"
    };

    let id;

    await request(app).post('/createUser').send(user).expect(200).then(response => id = response.body.id);

    await request(app).delete(`/deleteUser/${id}`).expect(200).then(res => {
    expect(res.body.affected).toBe(1);});
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
    await request(app).post('/createKey').send(first).expect(200, {
      ...first,
      id: 1
    });
    await request(app).post('/createKey').send(second).expect(200, {
      ...second,
      id: 2
    });
    await request(app).post('/createKey').send(third).expect(200, {
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
    await request(app).post('/createKey').send(first1).expect(200, {
      ...first1,
      id: 4
    });
    await request(app).post('/createKey').send(second1).expect(200, {
      ...second1,
      id: 5
    });
  });

  it('Deve retornar uma mansagem de chave já cadastrada', async () => {
    const key = {
      valor: "chave@chave.com",
      user: 2
    }; 

    await request(app).post('/createKey').send(key).expect(409, {
      message: "Chave ja cadastrada!"
    });
  });

  it('Deve retornar uma mansagem de limite de chaves do usuario atingido', async () => {
    const key = {
      valor: "904.434.231-43",
      user: 1
    }; 

    await request(app).post('/createKey').send(key).expect(403, {
      message: "Numero de chaves maximo atingido!"
    });
  });

  it('Deve atualizar o valor de uma chave', async () => {
    const key = {
      valor: "904.434.231-47"
    }

    await request(app).post(`/updateKey/1`).send(key).expect(200, {
      ...key,
      id: 1
    })
  })
    
  it('Deve buscar todas as chaves cadastradas', async () => {
    await request(app).get('/keys').expect(200).then(response => {
      expect(response.body.length).toBeGreaterThan(1)
    })
  })

  it('Deve buscar todas as chaves do primeiro usuario', async () => {
    await request(app).get('/keys/1').expect(200).then(response => {
      expect(response.body.length).toBe(3);
    });
  });
  
  it('Deve cadastrar uma chave para o segundo usuario e depois deletá-la', async () => {
    const key = {
      valor: "vou ser deletada",
      user: 2
    }; 

    let id;
    await request(app).post('/createKey').send(key).expect(200).then(response => id = response.body.id);

    await request(app).delete(`/deleteKey/${id}`).expect(200).then(response => {
      expect(response.body.affected).toBe(1);
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

     await request(app).post('/createTransaction').send(trans).expect(200, {
       ...trans,
       id: 1
     });
  });

  it('Deve criar uma transação pagador(usuario 2 com a chave 5), recebedor(usuario 1 com a chave 2)', async () => {
    const trans = {
      valor: 100,
	    payer: 5,
	    receiver: 2
    };

     await request(app).post('/createTransaction').send(trans).expect(200, {
       ...trans,
       id: 2
     });
  });
});