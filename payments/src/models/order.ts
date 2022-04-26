import { OrderStatus } from "@simtix/ticketing-common";
import mongoose from "mongoose";

interface OrderAttrs {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    price: number;
}

interface OrderDoc extends mongoose.Document {
    version: number;
    status: OrderStatus;
    userId: string;
    price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.id;
        }
    }
});


orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        userId: attrs.userId,
        status: attrs.status,
        version: attrs.version,
        price: attrs.price,
    })
}


const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };