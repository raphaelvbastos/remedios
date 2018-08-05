import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class RemediosProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(remedio: Remedio) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into remedios (nome) values (?)';
        let data = [remedio.nome];

        db.executeSql(sql, data)
          .then((dados) => resolve(dados))
          .catch((e) => console.error(JSON.stringify(e)));
      })
      .catch((e) => console.error(JSON.stringify(e)));
    });
  }

  public update(remedio: Remedio) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update remedios set nome = ? where id = ?';
        let data = [remedio.nome, remedio.id];

        db.executeSql(sql, data)
          .then((dados) => resolve(dados))
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    });
  }

  public remove(id: number) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from remedios where id = ?';
        let data = [id];

        db.executeSql(sql, data)
          .then((dados) => resolve(dados))
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    });
  }

  public get(id: number) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from remedios where id = ?';
        let data = [id];

        db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let remedio = new Remedio();
              remedio.id = item.id;
              remedio.nome = item.nome;
              resolve(remedio);
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    });
  }

  public getAll(nome: string = null) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM remedios';
        var data: any[];

        // filtrando pelo nome
        if (nome) {
          sql += ' where nome like ?'
          data.push('%' + nome + '%');
        }

        db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let remedios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var remedio = data.rows.item(i);
                remedios.push(remedio);
              }
              resolve(remedios);
            } else {
              resolve([]);
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    });
  }
}

export class Remedio {
  id: number;
  nome: string;
}