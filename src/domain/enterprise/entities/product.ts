import { Entity } from '@/shared/entities/entity';
import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { InvalidNameError } from '@/shared/errors/invalid-name-error';
import { InvalidPriceError } from '@/shared/errors/invalid-price-error';
import { InvalidQuantityProductError } from '@/shared/errors/invalid-quantity-product-error';
import type { Optional } from '@/shared/types/optional';

export interface ProductProps {
  name: string;
  quantity: number;
  salePrice: number;
  purchasePrice: number;
  categoryId: string | null;
  createdAt: Date;
  updatedAt?: Date;
  userId: UniqueEntityId;
}

const MIN_QUANTITY = 0;

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityId) {
    super(props, id);
    this.validate();
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
    return product;
  }

  private validate() {
    const isValidName = this.props.name?.trim().length;

    if (!isValidName) {
      throw new InvalidNameError();
    }

    if (this.props.quantity < MIN_QUANTITY) {
      throw new InvalidQuantityProductError();
    }

    if (this.props.salePrice < 0 || this.props.purchasePrice < 0) {
      throw new InvalidPriceError();
    }
  }

  updateName(name: string) {
    const isValidName = name?.trim().length;
    if (!isValidName) {
      throw new InvalidNameError();
    }
    this.props.name = name;
    this.markAsUpdated();
  }

  changeQuantity(quantity: number) {
    if (quantity < MIN_QUANTITY) {
      throw new InvalidQuantityProductError();
    }

    this.props.quantity = quantity;
    this.markAsUpdated();
  }

  changeSalePrice(salePrice: number) {
    if (salePrice < 0) {
      throw new InvalidPriceError();
    }

    this.props.salePrice = salePrice;
    this.markAsUpdated();
  }

  changePurchasePrice(purchasePrice: number) {
    if (purchasePrice < 0) {
      throw new InvalidPriceError();
    }

    this.props.purchasePrice = purchasePrice;
    this.markAsUpdated();
  }

  reclassifyCategory(categoryId: UniqueEntityId) {
    this.props.categoryId = categoryId.toString();
    this.markAsUpdated();
  }

  markAsUpdated() {
    this.props.updatedAt = new Date();
  }

  get name() {
    return this.props.name;
  }

  get quantity() {
    return this.props.quantity;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get salePrice() {
    return this.props.salePrice;
  }

  get purchasePrice() {
    return this.props.purchasePrice;
  }

  get userId() {
    return this.props.userId;
  }

  toJSON() {
    return {
      id: this.id.toString(),
      ...this.props,
      userId: this.props.userId.toString(),
    };
  }
}
