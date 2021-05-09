import APIError from '@src/common/APIError';
import HttpStatusCode from '@src/common/HttpStatusCode';
import Ajv from 'ajv';

const ajv = new Ajv();

const CreatignArticleSchema = {
  type: 'object',
  properties: {
    authorId: { type: 'string' },
    content: { type: 'string' },
    description: { type: 'string' },
    title: { type: 'string' },
    type: { type: 'string' },
  },
  required: ['authorId', 'content', 'title'],
  additionalProperties: false,
};
export default class CreatingArticlePayload {
  constructor (
      readonly authorId: string, 
      readonly content: string,
      readonly description: string,
      readonly title: string,
      readonly type: string
    ) {
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