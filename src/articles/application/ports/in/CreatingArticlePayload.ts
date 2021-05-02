import Ajv from 'ajv';

const ajv = new Ajv();

const CreatignArticleSchema = {
  type: 'object',
  properties: {
    authorId: { type: 'string' },
    content: { type: 'string' },
  },
  required: ['authorId', 'content'],
  additionalProperties: false,
};
export default class CreatingArticlePayload {
  constructor (readonly authorId: string, readonly content: string) {
    const isValid = ajv.validate(CreatignArticleSchema, {
      authorId: this.authorId,
      content: this.content
    })
    console.log(ajv.errors)
    if (!isValid) throw new Error(ajv.errors?.toString() || 'Payload is invalid')
  }
}