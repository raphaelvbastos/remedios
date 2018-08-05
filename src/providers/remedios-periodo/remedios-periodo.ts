import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';


@Injectable()
export class RemediosPeriodoProvider {

  constructor(private dbProvider: DatabaseProvider, public localNotifications: LocalNotifications) { }

  public insert(remediosPeriodo: RemediosPeriodo) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'insert into remediosPeriodo (remedio_id, quantidade, periodo_id) values (?, ?, ?)';
          let data = [remediosPeriodo.remedio_id, remediosPeriodo.quantidade, remediosPeriodo.periodo_id];

          db.executeSql(sql, data)
            .then((dados) => {
              this.notificacao(remediosPeriodo.periodo_id);
              resolve(dados);
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    });
  }

  public update(remediosPeriodo: RemediosPeriodo) {  
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'update remediosPeriodo set remedio_id = ?, quantidade = ?, periodo_id = ? where id = ?';
          let data = [remediosPeriodo.remedio_id, remediosPeriodo.quantidade, remediosPeriodo.periodo_id, remediosPeriodo.id];

          db.executeSql(sql, data)
            .then((dados) => {
              this.notificacao(remediosPeriodo.periodo_id);
              resolve(dados);
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    });
  }

  public remove(remediosPeriodo: RemediosPeriodo) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'delete from remediosPeriodo where id = ?';
          let data = [remediosPeriodo.id];

          db.executeSql(sql, data)
            .then((dados) => {
              this.notificacao(remediosPeriodo.periodo_id);
              resolve(dados);
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    });
  }

  public get(id: number) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'SELECT rp.*, r.nome as nome_remedio, p.nome as nome_periodo FROM remediosPeriodo rp ' +
            ' inner join periodos p on rp.periodo_id = p.id ' +
            ' inner join remedios r on rp.remedio_id = r.id ' +
            ' where rp.id = ?';
          let data = [id];

          db.executeSql(sql, data)
            .then((data: any) => {
              let remedioPeriodo = new RemediosPeriodo();
              if (data.rows.length > 0) {
                let item = data.rows.item(0);
                remedioPeriodo.id = item.id;
                remedioPeriodo.remedio_id = item.remedio_id;
                remedioPeriodo.quantidade = item.quantidade;
                remedioPeriodo.periodo_id = item.periodo_id;
              }
              resolve(remedioPeriodo);
            })
            .catch((e) => console.error("erro the", JSON.stringify(e)));
        })
        .catch((e) => console.error("erro select", JSON.stringify(e)));
    });
  }

  public getAll(nomeRemedio: string = null, periodo: number = null) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'SELECT rp.*, r.nome as nome_remedio, p.nome as nome_perido FROM remediosPeriodo rp ' +
            ' inner join periodos p on rp.periodo_id = p.id ' +
            ' inner join remedios r on rp.remedio_id = r.id ' +
            '  ';
          var data: any[];
          // filtrando pelo nome
          if (nomeRemedio) {
            sql += ' where r.nome like ?'
            data.push('%' + nomeRemedio + '%');
          }

          if (periodo) {
            if (data.length > 0) {
              sql += ' rp.periodo_id = ?';
            } else {
              sql += ' where rp.periodo_id = ?'
            }
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
              }
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    });
  }

  /*
  SELECT rp.*, r.nome as nome_remedio, p.nome as nome_perido FROM 
  remediosPeriodo rp inner join periodos p on rp.periodo_id = p.id 
  inner join remedios r on rp.remedio_id = r.id
  */
  public getRemedios(periodo: number) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'SELECT rp.*, r.nome as nome_remedio, p.nome as nome_periodo, p.hora FROM remediosPeriodo rp ' +
            ' inner join periodos p on rp.periodo_id = p.id ' +
            ' inner join remedios r on rp.remedio_id = r.id ' +
            ' where rp.periodo_id = ?';
          var data: any[] = [periodo];

          db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length > 0) {
                let remedios: any[] = [];
                for (var i = 0; i < data.rows.length; i++) {
                  var remedio = data.rows.item(i);
                  remedios.push(remedio);
                }
                resolve(remedios);
              }
            }).catch();
        }).catch()
        .catch();
    });
  }


  public getAllPorPeriodo(nomeRemedio: string = null, periodo: number = null) {
    return new Promise((resolve, reject) => {
      this.dbProvider.getDB()
        .then((db: SQLiteObject) => {

          let sql = 'SELECT rp.*, r.nome as nome_remedio, p.nome as nome_periodo FROM remediosPeriodo rp ' +
            ' inner join periodos p on rp.periodo_id = p.id ' +
            ' inner join remedios r on rp.remedio_id = r.id ' +
            '  ';
          var data: any[];

          // filtrando pelo nome
          if (nomeRemedio && nomeRemedio != null) {
            sql += ' where r.nome like ?'
            data.push('%' + nomeRemedio + '%');
          }



          if (periodo) {
            if (data.length > 0) {
              sql += ' rp.periodo_id = ?';
            } else {
              sql += ' where rp.periodo_id = ?';
            }
            console.log(sql);
            data.push(periodo);
          }
          console.log(sql);
          let remedios: any[] = [];
          let lista: any[] = [];
          db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length > 0) {
                let manha: any[] = [];
                let tarde: any[] = [];
                let noite: any[] = [];
                // let lista: any[];
                // let remedios: any[] = [];
                for (var i = 0; i < data.rows.length; i++) {
                  var remedio = data.rows.item(i);

                  switch (remedio.nome_periodo) {
                    case "Manhã": {
                      manha.push(remedio);
                      break;
                    }
                    case "Tarde": {
                      tarde.push(remedio);
                      break;
                    }
                    case "Noite": {
                      noite.push(remedio);
                      break;
                    }
                  }
                  // lista[remedio.nome_remedio].push(remedio); 
                  remedios.push(remedio);
                }
                if (manha.length > 0) {
                  lista.push({
                    periodo: "Manhã",
                    valores: manha
                  });
                }

                if (tarde.length > 0) {
                  lista.push({
                    periodo: "Tarde",
                    valores: tarde
                  });
                }

                if (noite.length > 0) {
                  lista.push({
                    periodo: "Noite",
                    valores: noite
                  });
                }
                resolve(lista);
              }
            })
            .catch((e) => console.error("erro for", JSON.stringify(e)));
        })
        .catch((e) => console.error("erro select", JSON.stringify(e)));
    });
  }

  public notificacao(periodo: number) {
    // Schedule multiple notifications
    // this.localNotifications.schedule([{
    //   id: 1,
    //   text: 'Multi ILocalNotification 1',
    //   sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
    //   data: { secret: key }
    // }, {
    //   id: 2,
    //   title: 'Local ILocalNotification Example',
    //   text: 'Multi ILocalNotification 2',
    //   icon: 'http://example.com/icon.png'
    // }]);

    // let remedios: any[];
    // this.getAll(null, 1).then(
    //   (dados: any[]) => {
    //     remedios = dados;
    //   }
    // )

    // console.log(remedios);
    // let texto = "";
    // remedios.forEach(element => {
    //   if(element.periodo == "Noite") {
    //     element.valores.forEach(e => {
    //       texto += e.nome_remedio + " - " + e.quantidade;
    //       texto += "<br>";
    //     });
    //   }
    // });

    // console.log(texto);

    let texto: string = "";
    let hora: string = "";
    this.getRemedios(periodo).then(
      (dados: any[]) => {
        let vetor: any[] = dados;

        vetor.forEach(element => {
          console.log("hora  ", element.hora);
          hora = element.hora;
          texto += element.nome_remedio + " - " + element.quantidade + "\n\r";
        });

        let time = hora.split(":");
        console.log("hora", time[0]);
        console.log("minuto", time[1]);
        var d = new Date(new Date().getFullYear(), 
                         new Date().getMonth(), 
                         new Date().getDate(), 
                         13, 59);

        // var d = new Date(new Date().getFullYear(), 
        // new Date().getMonth(), 
        // new Date().getDate(), 
        // parseInt(time[0]), parseInt(time[1]));
        console.log(d);
        this.localNotifications.schedule({
          title: 'Tomar Remédios',
          text: texto,
          // text: 'Aviso tomar remédios',
          // trigger: { at: new Date(new Date().getTime() + 10) },      
          // trigger: {
          //   count: 1,
          //   every: { minute: 58, seconds: 0}
          // },
          trigger: {
            at: d,
            // unit: ELocalNotificationTriggerUnit.DAY,
            // every: ELocalNotificationTriggerUnit.
            every: ELocalNotificationTriggerUnit.DAY
            // every: ELocalNotificationTriggerUnit.MINUTE
          },
          led: ['FF0000' , 1],
          // led: {
          //   color: '#ff0000'
          // }
          vibrate: true,
          icon: 'http://example.com/icon.png',
          sound: null
        });
      }
    );

    console.log("TEXT", texto);


    // Schedule delayed notification
    // var d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 21, 13);
    // console.log(d);
    // this.localNotifications.schedule({
    //   title: 'Remédios',
    //   text: texto,
    //   // text: 'Aviso tomar remédios',
    //   // trigger: { at: new Date(new Date().getTime() + 10) },      
    //   // trigger: {
    //   //   count: 1,
    //   //   every: { minute: 58, seconds: 0}
    //   // },
    //   trigger: {
    //     // firstAt: d,
    //     // every: ELocalNotificationTriggerUnit.DAY
    //     every: ELocalNotificationTriggerUnit.MINUTE
    //   },
    //   led: 'FF0000',
    //   vibrate: true,
    //   icon: 'http://example.com/icon.png',
    //   sound: null
    // });
  }
}

export class RemediosPeriodo {
  id: number;
  remedio_id: number;
  quantidade: string;
  periodo_id: number;
}