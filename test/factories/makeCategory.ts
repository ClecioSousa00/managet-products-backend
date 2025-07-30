import { Category, CategoryProps } from '@/domain/enterprise/entities/category'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export const makeCategory = (
  override: Partial<CategoryProps> = {},
  id?: UniqueEntityId,
): Category => {
  const user = Category.create(
    {
      name: 'Eletrônicos',
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return user
}
