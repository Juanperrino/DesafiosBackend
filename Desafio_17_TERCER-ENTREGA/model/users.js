import mongoose, { Schema } from 'mongoose';

const user = new Schema(
    {
        password: { type: String, require: true },
        email: {
            type: String,
            require: true,
            unique: true,
            index: true,
            validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
        },
        nombre: { type: String, required: true },
        direccion: { type: String, required: true },
        avatar: { type: String, required: true },
        edad: { type: Number, required: true },
        telefono: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('User', user);
