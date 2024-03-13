import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-read-write-data',
  templateUrl: './read-write-data.component.html',
  styleUrls: ['./read-write-data.component.scss'],
})
export class ReadWriteDataComponent implements OnInit {
  products: any;
  price: number = 0;
  name: string = '';
  img: string = 'https://source.unsplash.com/random/500x500/?';
  counter: number = 0;
  auth: AuthService;
  constructor(authService: AuthService) {
    this.auth = authService;
    this.auth.dataRead().subscribe((res: any) => (this.products = res));
  }

  write() {
    this.auth.writeData({
      price: this.price,
      name: this.name,
      img: this.img + this.name,
    });
  }

  incrementCounter(productName: string) {
    const product = this.products.find((p: { payload: { doc: { data: () => { (): any; new(): any; name: string; }; }; }; }) => p.payload.doc.data().name === productName);
    if (product) {
        product.counter++;
    }
}

remove(productName: string) {
    const product = this.products.find((p: { payload: { doc: { data: () => { (): any; new(): any; name: string; }; }; }; }) => p.payload.doc.data().name === productName);
    if (product && product.counter > 0) {
        product.counter--;
    }
}


  ngOnInit(): void {
    this.auth.dataRead().subscribe((res: any) => {
      this.products = res.map((product: any) => ({
        ...product,
        counter: 0, // Añade un contador a cada producto
      }));
    });
  }
}
