import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PeriodosProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(periodo: Periodo) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into periodos (nome, hora) values (?, ?)';
        let data = [periodo.nome, periodo.hora];

        return db.executeSql(sql, data)
          .then((dados) => resolve(dados))
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    });
  }

  public update(periodo: Periodo) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update periodos set nome = ?, hora = ? where id = ?';
        let data = [periodo.nome, periodo.hora, periodo.id];

        db.executeSql(sql, data).then(
          (dados) => resolve(dados)
        )
        .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    });
  }

  public remove(id: number) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from periodos where id = ?';
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
        let sql = 'select * from periodos where id = ?';
        let data = [id];

        db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let periodo = new Periodo();
              periodo.id = item.id;
              periodo.nome = item.nome;
              periodo.hora = item.hora;
              resolve(periodo);
            }
            resolve(null);
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    });
  }

  public getAll() {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'SELECT * FROM periodos';
          var data: any[];

          db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length > 0) {
                let periodos: any[] = [];
                for (var i = 0; i < data.rows.length; i++) {
                  var periodo = data.rows.item(i);
                  periodos.push(periodo);
                }
                resolve(periodos);
              } else {
                resolve([]);
              }
            }).catch(e => console.log('db.executeSql error: ', JSON.stringify(e)));
        }).catch(e => console.log('sqlite.create error: ', e));
    });
  }
}

export class Periodo {
  id: number;
  nome: string;
  hora: string;
}