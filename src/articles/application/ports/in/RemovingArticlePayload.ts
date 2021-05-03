import APIError from '@src/common/APIError';
import HttpStatusCode from '@src/common/HttpStatusCode';
import Ajv from 'ajv';

const ajv = new Ajv();

const RemovingArticleSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
};

export default class RemovingArticlePayload {
  constructor (readonly id: string) {
    const isValid = ajv.validate(RemovingArticleSchema, {
      id: this.id,
    });
    if (!isValid) throw new APIError(
      'BAD REQUEST',
      HttpStatusCode.BAD_REQUEST,
      true,
      ajv.errors[0].message
    )
  }
};
