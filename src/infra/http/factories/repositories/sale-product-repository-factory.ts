import { SaleProductPrismaRepository } from '@/infra/database/prisma/repositories/sale-product-prisma-repository';

const saleProductRepository = new SaleProductPrismaRepository();

export const makeSaleProductRepository = () => {
  return saleProductRepository;
};
