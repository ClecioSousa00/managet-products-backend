import { SaleProductsPrismaQueryService } from '@/infra/database/prisma/queries-service/sale-products-query-service';

const saleProductQueryService = new SaleProductsPrismaQueryService();

export const makeSaleProductQueryService = () => {
  return saleProductQueryService;
};
