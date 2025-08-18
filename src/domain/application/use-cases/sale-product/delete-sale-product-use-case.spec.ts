import { makeProduct } from 'test/factories/makeProduct';
import { makeSaleProduct } from 'test/factories/makeSaleProduct';
import { makeUser } from 'test/factories/makeUser';
import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository';
import { InMemorySaleProductRepository } from 'test/in-memory-repositories/in-memory-sale-product-repository';
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { DeleteSaleProductUseCase } from './delete-sale-product-use-case';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemorySaleProductRepository: InMemorySaleProductRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let deleteSaleProductUseCase: DeleteSaleProductUseCase;

describe('Delete Sale Product Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemorySaleProductRepository = new InMemorySaleProductRepository();
    inMemoryProductRepository = new InMemoryProductRepository();

    deleteSaleProductUseCase = new DeleteSaleProductUseCase(
      inMemoryUserRepository,
      inMemorySaleProductRepository,
      inMemoryProductRepository
    );
  });

  it('Should be able to delete a product', async () => {
    const user = makeUser();
    const product = makeProduct({ userId: user.id, quantity: 5 });
    const saleProduct = makeSaleProduct({
      productId: product.id,
      userId: user.id,
      quantity: 5,
    });

    inMemoryUserRepository.items.push(user);
    inMemoryProductRepository.items.push(product);
    inMemorySaleProductRepository.items.push(saleProduct);

    await deleteSaleProductUseCase.execute({
      userId: user.id.toString(),
      saleProductId: saleProduct.id.toString(),
    });

    expect(inMemorySaleProductRepository.items).toHaveLength(0);
    expect(inMemoryProductRepository.items[0].quantity).toBe(10);
  });

  it('Should not be able to delete a product if product not found', async () => {
    const user = makeUser();
    const saleProduct = makeSaleProduct({
      userId: user.id,
    });

    inMemoryUserRepository.items.push(user);
    inMemorySaleProductRepository.items.push(saleProduct);

    await expect(() =>
      deleteSaleProductUseCase.execute({
        userId: user.id.toString(),
        saleProductId: saleProduct.id.toString(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
  it('Should not be able to delete a product if sale product not found', async () => {
    const user = makeUser();
    const product = makeProduct({ userId: user.id });

    inMemoryUserRepository.items.push(user);
    inMemoryProductRepository.items.push(product);

    await expect(() =>
      deleteSaleProductUseCase.execute({
        userId: user.id.toString(),
        saleProductId: 'fake-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
