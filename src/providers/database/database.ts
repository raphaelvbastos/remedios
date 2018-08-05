import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlLite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  public getDB() {
    return this.sqlLite.create({
      name: "remedios.db",
      location: "default"
    });
  }

  public createDatabase() {
    return this.getDB().then(
      (db: SQLiteObject) => {
        this.createTables(db);
        this.insertDefaults(db);
      }
    ).catch(e => console.log(e));
  }

  public createTables(db: SQLiteObject) {
    // db.sqlBatch(
    //   [
    //     ['CREATE TABLE IF NOT EXISTS periodos (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, hora TEXT)'],
    //     ['CREATE TABLE IF NOT EXISTS remedios (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
    //     ['CREATE TABLE IF NOT EXISTS remediosPeriodo (id integer primary key AUTOINCREMENT NOT NULL, remedio_id integer, FOREIGN KEY(remedio_id) REFERENCES remedios(id), quantidade TEXT, periodo_id integer, FOREIGN KEY(periodo_id) REFERENCES periodos(id))']
    //   ]
    // ).then(
    //   (info) => console.log('Tabelas criadas', JSON.stringify(info))
    // ).catch(
    //   e => console.error('Erro ao criar as tabelas', JSON.stringify(e))
    // );

    db.sqlBatch(
      [
        'CREATE TABLE IF NOT EXISTS periodos (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, hora TEXT)'
      ]
    ).then(
      (info) => console.log('Tabelas criadas [periodos]', JSON.stringify(info))
    ).catch(
      e => console.error('Erro ao criar as tabelas [periodos]', JSON.stringify(e))
    );

    db.sqlBatch(
      [
        'CREATE TABLE IF NOT EXISTS remedios (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'
      ]
    ).then(
      (info) => console.log('Tabelas criadas [remedios]', JSON.stringify(info))
    ).catch(
      e => console.error('Erro ao criar as tabelas [remedios]', JSON.stringify(e))
    );

    db.sqlBatch(
      [
        `CREATE TABLE IF NOT EXISTS remediosPeriodo (
              id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
              remedio_id INTEGER,                 
              quantidade TEXT, 
              periodo_id INTEGER, 
              FOREIGN KEY (remedio_id) REFERENCES remedios(id), 
              FOREIGN KEY (periodo_id) REFERENCES periodos (id)
        )`
      ]
    ).then(
      (info) => console.log('Tabelas criadas [remediosPeriodo]', JSON.stringify(info))
    ).catch(
      e => console.error('Erro ao criar as tabelas [remediosPeriodo]', JSON.stringify(e))
    );

  }

  public insertDefaults(db: SQLiteObject) {
    // db.sqlBatch([
    //   ['insert into periodos (nome, hora) values (?, ?)', ['Manhã', '07:00']],
    //   ['insert into periodos (nome, hora) values (?, ?)', ['Tarde', '14:00']],
    //   ['insert into periodos (nome, hora) values (?, ?)', ['Noite', '19:30']]
    // ])
    //   .then(() => console.log('Dados padrões incluídos'))
    //   .catch(e => console.error('Erro ao incluir dados padrões', JSON.stringify(e)));

    console.log("DB: ", JSON.stringify(db));
    db.executeSql('select COUNT(id) as qtd from periodos', [])
      .then((data: any) => {
        console.log("DADOS: ", JSON.stringify(data));
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {
          console.log("TABELA VAZIA");
          // Criando as tabelas
          db.sqlBatch([
            ['insert into periodos (nome, hora) values (?, ?)', ['Manhã', '07:00']],
            ['insert into periodos (nome, hora) values (?, ?)', ['Tarde', '14:00']],
            ['insert into periodos (nome, hora) values (?, ?)', ['Noite', '19:30']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', JSON.stringify(e)));
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de periodos', JSON.stringify(e)));
  }

}
