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
    if (!isValid) throw new Error(ajv.errors?.toString() || 'Payload is invalid');
  }
};
