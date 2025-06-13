import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Category, CategoryProps } from '@/domain/enterprise/entities/Category'

export const makeCategory = (
  override: Partial<CategoryProps> = {},
  id?: UniqueEntityId,
): Category => {
  const user = Category.create(
    {
      name: 'Eletrônicos',
      ...override,
    },
    id,
  )

  return user
}
