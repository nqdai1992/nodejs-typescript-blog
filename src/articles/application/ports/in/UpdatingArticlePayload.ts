import APIError from '@src/common/APIError';
import HttpStatusCode from '@src/common/HttpStatusCode';
import Ajv from 'ajv';

const ajv = new Ajv();

const UpdatingArticleSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    authorId: { type: 'string' },
    content: { type: 'string' },
  },
  required: ['id', 'authorId', 'content'],
  additionalProperties: false,
};

export default class UpdatingArticlePayload {
  constructor (readonly id: string, readonly authorId: string, readonly content: string) {
    const isValid = ajv.validate(UpdatingArticleSchema, {
      id: this.id,
      authorId: this.authorId,
      content: this.content,
    });
    if (!isValid) throw new APIError(
      'BAD REQUEST',
      HttpStatusCode.BAD_REQUEST,
      true,
      ajv.errors[0].message
    )
  }
};
