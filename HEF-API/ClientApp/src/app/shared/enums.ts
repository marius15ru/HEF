export enum DataOperation {
    Undefined = 0,
    Insert = 1,
    Read = 2,
    Update = 3,
    Delete = 4,
    List = 5,
    ListByPlant = 6,
    ListByUser = 7,
    ListByJob = 8,

}

export enum Role {
    'Óskilgreint' = 0,
    'Verkaðili' = 1,
    'Stjórnandi' = 2,
}

export enum UserStatus {
    'Óskilgreint' = 0,
    'Tiltæk/ur' = 1,
    'Ótiltæk/ur' = 2,
}

export enum JobStatus {
    'Óskilgreint' = 0,
    'Óúthlutað' = 1,
    'Úthlutað' = 2,
    'Í vinnslu' = 3,
    'Í bið' = 4,
    'Lokið' = 5,
}

export enum MeasurementType {
    'Óskilgreint' = 0,
    'Celsíus' = 1,
    'Lítrar' = 2,
    'Þrýstingur(bar)' = 3,
    'Metrar' = 4,
    'Lítrar á sekúndu' = 5
}

export enum PlantType {
    Undefined = 0,
    Water = 1,
    Data = 2,
    Heat = 3,
    Drainage = 4
}

export enum Recurring {
    'Óskilgreint' = 0,
    'Vikulega' = 1,
    'Tveggja vikna fresti' = 2,
    'Mánaðarlega' = 3,
    'Tveggja mánaða fresti' = 4,
    'Þriggja mánaða fresti' = 5,
    'Hálfs árs fresti' = 6,
    'Árlega' = 7,
    'Tveggja ára fresti' = 8,
    'Þriggja ára fresti' = 9,
    'Fimm ára fresti' = 10,
    'Tíu ára fresti' = 11
}

export namespace Recurring {

    export function values() {
      return Object.keys(Recurring).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }

export enum SubJobTask {
    'Óskilgreint' = 0,
    'Þrífa' = 1,
    'Ryksuga' = 2,
    'Niðurdráttur' = 3,
    'Mæla olíu' = 4,
    'Mæla hitastig' = 5,
    'Mæla hæð' = 6,
    'Skúra' = 7,
    'Athuga mótor' = 8
}
