import Ajv from 'ajv';

const ajv = new Ajv();

interface IUpdatingArticlePayload { authorId: string, content: string }

const UpdatingArticlePayload = {
  type: 'object',
  properties: {
    authorId: { type: 'string' },
    content: { type: 'string' },
  },
  required: ['authorId', 'content'],
  additionalProperties: false,
};

const UpdatingArticlePayloadIsValid = (payload: IUpdatingArticlePayload ): IUpdatingArticlePayload => {
    const isValid = ajv.validate(UpdatingArticlePayload, payload)
    if (!isValid) throw new Error(ajv.errors?.toString() || 'Payload is invalid')
    return payload
}

export default UpdatingArticlePayloadIsValid
