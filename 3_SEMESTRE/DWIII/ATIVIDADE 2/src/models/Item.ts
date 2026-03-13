import mongoose, { Schema, Document} from 'mongoose';

export interface Item extends Document {
    nome: string;
    valor: number;
}

const ItemSchema: Schema = new Schema ({
    nome: { type: String, required: true},
    valor: { type: Number, requires: true}
});

export default mongoose.model<Item>('Item', ItemSchema);