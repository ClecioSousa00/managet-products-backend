import { makeProduct } from 'test/factories/makeProduct';
import { makeSaleProduct } from 'test/factories/makeSaleProduct';
import { makeUser } from 'test/factories/makeUser';
import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository';
import { InMemorySaleProductRepository } from 'test/in-memory-repositories/in-memory-sale-product-repository';
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository';
import { UpdateSaleProductUseCase } from './update-sale-product-use-case';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemorySaleProductRepository: InMemorySaleProductRepository;

let updateSaleProductUseCase: UpdateSaleProductUseCase;

describe('Update Sale Product Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemorySaleProductRepository = new InMemorySaleProductRepository();
    updateSaleProductUseCase = new UpdateSaleProductUseCase(
      inMemoryUserRepository,
      inMemorySaleProductRepository,
      inMemoryProductRepository
    );
  });

  it('Should be able to update a sale product increase quantity', async () => {
    const user = makeUser();
    const product = makeProduct({ userId: user.id, quantity: 5 });
    const saleProduct = makeSaleProduct({
      productId: product.id,
      userId: user.id,
      quantity: 4,
    });

    inMemoryUserRepository.items.push(user);
    inMemoryProductRepository.items.push(product);
    inMemorySaleProductRepository.items.push(saleProduct);

    await updateSaleProductUseCase.execute({
      saleProductId: saleProduct.id.toString(),
      userId: user.id.toString(),
      quantity: 5,
    });

    expect(inMemorySaleProductRepository.items[0].quantity).toEqual(5);
    expect(inMemoryProductRepository.items[0].quantity).toEqual(4);
  });

  it('Should be able to update a sale product decrease quantity', async () => {
    const user = makeUser();
    const product = makeProduct({ userId: user.id, quantity: 5 });
    const saleProduct = makeSaleProduct({
      productId: product.id,
      userId: user.id,
      quantity: 4,
    });

    inMemoryUserRepository.items.push(user);
    inMemoryProductRepository.items.push(product);
    inMemorySaleProductRepository.items.push(saleProduct);

    await updateSaleProductUseCase.execute({
      saleProductId: saleProduct.id.toString(),
      userId: user.id.toString(),
      quantity: 3,
    });

    expect(inMemorySaleProductRepository.items[0].quantity).toEqual(3);
    expect(inMemoryProductRepository.items[0].quantity).toEqual(6);
  });
  it('Should be able to update a sale product', async () => {
    const user = makeUser();
    const product = makeProduct({ userId: user.id });
    const saleProduct = makeSaleProduct({
      productId: product.id,
      userId: user.id,
      salePriceAtTime: 10_000,
    });

    inMemoryUserRepository.items.push(user);
    inMemoryProductRepository.items.push(product);
    inMemorySaleProductRepository.items.push(saleProduct);

    await updateSaleProductUseCase.execute({
      saleProductId: saleProduct.id.toString(),
      userId: user.id.toString(),
      salePriceAtTime: 2000,
    });

    expect(inMemorySaleProductRepository.items[0].salePriceAtTime).toEqual(
      2000
    );
  });
});
