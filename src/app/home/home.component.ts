import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { Current } from "../shared/model/price.model";
import { PriceService } from "../shared/service/price.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  formulario: FormGroup;
  public allPrices: Current[] = [];
  public current: Current[] = [];
  public textSearch = "";

  public coinType: string = "";
  public dateInit: string = "";
  public dateFinal: string = "";

  public coins = [
    {
      ID: "AUD",
      TEXT: "Dólar australiano",
    },
    {
      ID: "CAD",
      TEXT: "Dólar canadense",
    },
    {
      ID: "EUR",
      TEXT: "Euro",
    },
    {
      ID: "USD",
      TEXT: "Dólar dos Estados Unidos",
    },
  ];

  constructor(
    public priceService: PriceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPrices();
    this.formulario = this.formBuilder.group({
      dateInit: ["", [Validators.required]],
      dateFinal: ["", [Validators.required]],
      coin: ["", [Validators.required]],
    });
  }

  getPrices() {
    this.priceService.getAllPrices().subscribe((data) => {
      data.value.forEach((value) => {
        this.allPrices.push(value);
        this.current.push(value);
      });
    });
  }

  consultData(coin, dateInit, dateFinal) {
    this.allPrices.filter((value) => {
      console.log(value);
    });

    if (dateInit > dateFinal || dateFinal < dateInit) {
      alert("As datas não estão de acordo!");
    } else {
      const init = moment(dateInit).format("MM-DD-yyyy");
      const final = moment(dateFinal).format("MM-DD-yyyy");

      this.priceService.filterPrices(coin, init, final).subscribe((data) => {
        this.allPrices = [];
        data.value.forEach((value) => {
          this.allPrices.push(value);
        });
      });
    }
  }

  searchBuy(event?: Event): void {
    let target = event.target as HTMLInputElement;
    const value = target.value;

    this.allPrices = this.current.filter((element) => {
      return (
        element.cotacaoCompra
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1
      );
    });
  }
  searchSell(event?: Event): void {
    let target = event.target as HTMLInputElement;
    const value = target.value;

    this.allPrices = this.current.filter((element) => {
      return (
        element.cotacaoVenda
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1
      );
    });
  }
  searchDT(event?: Event): void {
    let target = event.target as HTMLInputElement;
    const value = target.value;

    this.allPrices = this.current.filter((element) => {
      return (
        element.dataHoraCotacao
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1
      );
    });
  }

  refresh() {
    this.allPrices = this.current;
  }
}
