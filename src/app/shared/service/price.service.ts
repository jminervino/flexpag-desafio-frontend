import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Price } from "../model/price.model";

@Injectable({
  providedIn: "root",
})
export class PriceService {
  apiUrl =
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='07-06-2022'&@dataFinalCotacao='07-25-2022'&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao";

  constructor(public httpClient: HttpClient) {}

  public getAllPrices(): Observable<Price> {
    return this.httpClient.get(this.apiUrl) as Observable<any>;
  }

  public filterPrices(
    coin: string,
    dateInit: string,
    dateFinal: string
  ): Observable<Price> {
    return this.httpClient.get<Price>(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${coin}'&@dataInicial='${dateInit}'&@dataFinalCotacao='${dateFinal}'&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    );
  }
}
