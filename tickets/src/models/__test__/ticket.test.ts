import { Ticket } from "../ticket"

it('implements optimistic concurrency control', async () => {
    const ticket = Ticket.build({
        title: 'KXIP vs SRH',
        price: 230,
        userId: '2345',
    });
    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    secondInstance!.set({ price: 100 });
    firstInstance!.set({ price: 100 });

    await secondInstance!.save();

    try {
        await firstInstance!.save();
    } catch(err) {
        return
    }

    throw new Error('Should not reach this point');
});