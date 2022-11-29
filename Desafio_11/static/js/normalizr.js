const authorSchema = new normalizr.schema.Entity("author", {}, {idAttribute: "email"});

const messageSchema = new normalizr.schema.Entity("messages",{
    author: authorSchema
}
)

const messagesSchema = new normalizr.schema.Entity("arrayMessages",
{
    messages: [messageSchema]
})

const denormalizar = (data) => {
    const result = normalizr.denormalize(data.result, messagesSchema, data.entities);
    return result;
}
