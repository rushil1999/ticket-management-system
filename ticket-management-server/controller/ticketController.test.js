import app from '../index';
import request from 'supertest';
import { TICKET_DEFAULT_COUNT } from '../constants';

describe('GET /ticket/tickets', ()=>{
    describe('checking correct response and payload details', () =>{
        let response;
        beforeAll(async ()=>{
            response = await request(app).get('/ticket/tickets?page=1');
        })
        test('response status should be 200',  ()=>{
            expect(response.status).toEqual(200);
        });
        
        test('tickets count should be same as default count',  () =>{
            expect(response.body.payload.tickets.length).toEqual(TICKET_DEFAULT_COUNT);
        });
    });
    describe('checking error response', () => {
        test('Checking for Not found response', async () =>{
            const response = await request(app).get('https://zccrushi19l.zendesk.com/api/v2/tickets.json');
            expect(response.status).toEqual(404);
        })
    });
});

describe('GET /ticket/:id', ()=>{
    describe('checking correct response and payload details', () =>{
        let response;
        beforeAll(async ()=>{
            response = await request(app).get('/ticket/1');
        })
        test('response status should be 200',  ()=>{
            expect(response.status).toEqual(200);
        });
        test('response ticket should have id as 1',  ()=>{
            expect(response.body.payload.ticket.id).toEqual(1);
        });
        
    });
    describe('checking error response', () => {
        test('Checking for Not found response', async () =>{
            const response = await request(app).get('https://zccrushi19l.zendesk.com/api/v2/tickets/1');
            expect(response.status).toEqual(404);
        })

    });
})
