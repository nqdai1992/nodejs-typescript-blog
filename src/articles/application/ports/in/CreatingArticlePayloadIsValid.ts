import Ajv from 'ajv';

const ajv = new Ajv();

interface ICreatingArticlePayload { authorId: string, content: string }

const UpdatingArticlePayload = {
  type: 'object',
  properties: {
    authorId: { type: 'string' },
    content: { type: 'string' },
  },
  required: ['authorId', 'content'],
  additionalProperties: false,
};

const CreatingArticlePayloadIsValid = (payload: ICreatingArticlePayload ): ICreatingArticlePayload => {
    const isValid = ajv.validate(UpdatingArticlePayload, payload)
    if (!isValid) throw new Error(ajv.errors?.toString() || 'Payload is invalid')
    return payload
}

export default CreatingArticlePayloadIsValid