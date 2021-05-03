import APIError from '@src/common/APIError';
import HttpStatusCode from '@src/common/HttpStatusCode';
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
    
    if (!isValid) throw new APIError(
      'BAD REQUEST',
      HttpStatusCode.BAD_REQUEST,
      true,
      ajv.errors[0].message
    )
  }
}