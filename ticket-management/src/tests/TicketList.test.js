import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import TicketList from '../components/TicketList'

const server = setupServer(
  rest.get('/tickets', (req, res, ctx) => {
    return res(ctx.json(
        {
            "payload": {
                "tickets": [
                    {
                        "id": 1,
                        "subject": "Sample ticket: Meet the ticket",
                        "tags": [
                            "sample",
                            "support",
                            "zendesk"
                        ]
                    },
                    {
                        "id": 2,
                        "subject": "My printer is on fire!",
                        "tags": []
                    },
                    {
                        "id": 3,
                        "subject": "velit eiusmod reprehenderit officia cupidatat",
                        "tags": [
                            "est",
                            "incididunt",
                            "nisi"
                        ]
                    },
                    {
                        "id": 4,
                        "subject": "excepteur laborum ex occaecat Lorem",
                        "tags": [
                            "amet",
                            "labore",
                            "voluptate"
                        ]
                    },
                    {
                        "id": 5,
                        "subject": "ad sunt qui aute ullamco",
                        "tags": [
                            "laborum",
                            "mollit",
                            "proident"
                        ]
                    },
                    {
                        "id": 6,
                        "subject": "aliquip mollit quis laborum incididunt",
                        "tags": [
                            "consectetur",
                            "mollit",
                            "sit"
                        ]
                    },
                    {
                        "id": 7,
                        "subject": "nisi aliquip ipsum nostrud amet",
                        "tags": [
                            "cillum",
                            "et",
                            "occaecat"
                        ]
                    },
                    {
                        "id": 8,
                        "subject": "cillum quis nostrud labore amet",
                        "tags": [
                            "ad",
                            "et",
                            "lorem"
                        ]
                    },
                    {
                        "id": 9,
                        "subject": "proident est nisi non irure",
                        "tags": [
                            "aute",
                            "consectetur",
                            "sit"
                        ]
                    },
                    {
                        "id": 10,
                        "subject": "veniam ea eu minim aute",
                        "tags": [
                            "ad",
                            "aute",
                            "et"
                        ]
                    },
                    {
                        "id": 11,
                        "subject": "magna reprehenderit nisi est cillum",
                        "tags": [
                            "aliquip",
                            "magna",
                            "non"
                        ]
                    },
                    {
                        "id": 12,
                        "subject": "quis veniam ad sunt non",
                        "tags": [
                            "aliquip",
                            "consequat",
                            "magna"
                        ]
                    },
                    {
                        "id": 13,
                        "subject": "tempor aliquip sint dolore incididunt",
                        "tags": [
                            "ad",
                            "minim",
                            "non"
                        ]
                    },
                    {
                        "id": 14,
                        "subject": "labore pariatur ut laboris laboris",
                        "tags": [
                            "culpa",
                            "dolor",
                            "eiusmod"
                        ]
                    },
                    {
                        "id": 15,
                        "subject": "officia mollit aliqua eu nostrud",
                        "tags": [
                            "cillum",
                            "fugiat",
                            "irure"
                        ]
                    },
                    {
                        "id": 16,
                        "subject": "do incididunt incididunt quis anim",
                        "tags": [
                            "exercitation",
                            "officia",
                            "veniam"
                        ]
                    },
                    {
                        "id": 17,
                        "subject": "tempor magna anim ea id",
                        "tags": [
                            "id",
                            "laborum",
                            "reprehenderit"
                        ]
                    },
                    {
                        "id": 18,
                        "subject": "exercitation sit incididunt magna laboris",
                        "tags": [
                            "non",
                            "proident",
                            "tempor"
                        ]
                    },
                    {
                        "id": 19,
                        "subject": "laborum ea ut in cupidatat",
                        "tags": [
                            "commodo",
                            "exercitation",
                            "sunt"
                        ]
                    },
                    {
                        "id": 20,
                        "subject": "est fugiat labore pariatur esse",
                        "tags": [
                            "dolore",
                            "reprehenderit",
                            "veniam"
                        ]
                    },
                    {
                        "id": 21,
                        "subject": "commodo sint laboris est et",
                        "tags": [
                            "excepteur",
                            "sunt",
                            "ut"
                        ]
                    },
                    {
                        "id": 22,
                        "subject": "laboris sint Lorem ex Lorem",
                        "tags": [
                            "commodo",
                            "duis",
                            "minim"
                        ]
                    },
                    {
                        "id": 23,
                        "subject": "esse adipisicing consectetur sunt tempor",
                        "tags": [
                            "consectetur",
                            "nulla",
                            "occaecat"
                        ]
                    },
                    {
                        "id": 24,
                        "subject": "sunt enim pariatur id id",
                        "tags": [
                            "eu",
                            "pariatur",
                            "tempor"
                        ]
                    },
                    {
                        "id": 25,
                        "subject": "et ad ut enim labore",
                        "tags": [
                            "aliqua",
                            "dolor",
                            "officia"
                        ]
                    }
                ],
                "count": 202
            }
        }
    ))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
    render(<TicketList />)

    // fireEvent.click(screen.getByText('Load Greeting'))

    // await waitFor(() => screen.getByRole('ticket'))
    // console.log(screen.debug(screen.getByRole('ticket')));
    const node = screen.getAllByLabelText('Tickets');
    console.log(node);
//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toBeDisabled()
})

// test('handles server error', async () => {
//   server.use(
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.status(500))
//     }),
//   )

//   render(<Fetch url="/greeting" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('alert'))

//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
//   expect(screen.getByRole('button')).not.toBeDisabled()
// })