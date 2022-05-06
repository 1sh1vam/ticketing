import { OrderStatus } from "@simtix/ticketing-common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

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
    findByEvent(event: { id: string, version: number }): OrderDoc;
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
            delete ret._id;
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);


orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        userId: attrs.userId,
        status: attrs.status,
        version: attrs.version,
        price: attrs.price,
    })
}

orderSchema.statics.findByEvent = async (event: { id: string; version: number }) => {
    return Order.findOne({
        _id: event.id,
        version: event.version - 1,
    });
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };