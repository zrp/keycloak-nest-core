import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('How to create a slug?')

  expect(slug.value).toEqual('how-to-create-a-slug')
})
