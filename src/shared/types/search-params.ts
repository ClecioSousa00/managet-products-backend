export const orderByValues = ['name', 'date', 'salePrice', 'quantity'] as const;
export type OrderBy = (typeof orderByValues)[number];

export const orderDirectionValues = ['asc', 'desc'] as const;
export type OrderDirection = (typeof orderDirectionValues)[number];
