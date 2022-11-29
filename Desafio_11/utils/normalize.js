import { normalize, schema } from "normalizr";

const authorSchema = new schema.Entity("author", {}, {idAttribute: "email"});

const messageSchema = new schema.Entity("messages",{
    author: authorSchema
}
)

const messagesSchema = new schema.Entity("arrayMessages",
{
    messages: [messageSchema]
})

const normalizar = (data) => {
    const layout = {
        id: "messages",
        messages: []
    }
    data.forEach(el =>{
        layout.messages.push({
            id: el._id.toString(),
            text: el.text,
            created_at: el.created_at,
            author: {
                ...el.author
            }
        })
    });
    
    const result = normalize(layout, messagesSchema);
    return result;
}

export {
    normalizar
}