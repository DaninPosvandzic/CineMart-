import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../../../api-services/Catalog/product-api.model';
import {ProductApiService} from '../../../api-services/Catalog/product-api.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  standalone:false
})
export class ProductPageComponent implements OnInit {

  product: Product | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productApi: ProductApiService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!productId) {
      this.errorMessage = 'Proizvod nije pronađen';
      this.isLoading = false;
      return;
    }

    this.productApi.getAll().subscribe({
      next: (res:any) => {
        this.product = res.items.find((p:any) => p.id === productId) || null;
        if (!this.product) this.errorMessage = 'Proizvod nije pronađen';
        this.isLoading = false;
      },
      error: (err:unknown) => {
        console.error(err);
        this.errorMessage = 'Greška pri učitavanju proizvoda';
        this.isLoading = false;
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;
    console.log(`Dodano u košaricu: ${this.product.name}`);
    // ovdje možeš pozvati tvoj CartService add method
  }

}
