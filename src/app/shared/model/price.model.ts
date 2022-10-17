export interface Price {
  value: Current[];
}

export interface Current {
  cotacaoCompra: string;
  cotacaoVenda: string;
  dataHoraCotacao: string;
}
