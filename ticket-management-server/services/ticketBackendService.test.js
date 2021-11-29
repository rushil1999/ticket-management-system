import { parseTicketsListData } from "./ticketBackendService"

describe('service function parseTicketsListData()', ()=>{
    const testInput = [
        {
            "url": "https://zccrushil.zendesk.com/api/v2/tickets/1.json",
            "id": 1,
            "external_id": null,
            "via": {
                "channel": "sample_ticket",
                "source": {
                    "from": {},
                    "to": {},
                    "rel": null
                }
            },
            "created_at": "2021-11-24T21:06:56Z",
            "updated_at": "2021-11-24T21:06:56Z",
            "type": "incident",
            "subject": "Sample ticket: Meet the ticket",
            "raw_subject": "Sample ticket: Meet the ticket",
            "description": "Hi there,\n\nI’m sending an email because I’m having a problem setting up your new product. Can you help me troubleshoot?\n\nThanks,\n The Customer\n\n",
            "priority": "normal",
            "status": "open",
            "recipient": null,
            "requester_id": 1267104132769,
            "submitter_id": 1267109181870,
            "assignee_id": 1267109181870,
            "organization_id": null,
            "group_id": 4411144210843,
            "collaborator_ids": [],
            "follower_ids": [],
            "email_cc_ids": [],
            "forum_topic_id": null,
            "problem_id": null,
            "has_incidents": false,
            "is_public": true,
            "due_at": null,
            "tags": [
                "sample",
                "support",
                "zendesk"
            ],
            "custom_fields": [],
            "satisfaction_rating": null,
            "sharing_agreement_ids": [],
            "followup_ids": [],
            "ticket_form_id": 1260815049769,
            "brand_id": 1260803252829,
            "allow_channelback": false,
            "allow_attachments": true
        },
        {
            "url": "https://zccrushil.zendesk.com/api/v2/tickets/2.json",
            "id": 2,
            "external_id": null,
            "via": {
                "channel": "api",
                "source": {
                    "from": {},
                    "to": {},
                    "rel": null
                }
            },
            "created_at": "2021-11-24T21:45:46Z",
            "updated_at": "2021-11-24T21:45:46Z",
            "type": null,
            "subject": "My printer is on fire!",
            "raw_subject": "My printer is on fire!",
            "description": "The smoke is very colorful.",
            "priority": null,
            "status": "open",
            "recipient": null,
            "requester_id": 1267109181870,
            "submitter_id": 1267109181870,
            "assignee_id": 1267109181870,
            "organization_id": 1260918741269,
            "group_id": 4411144210843,
            "collaborator_ids": [],
            "follower_ids": [],
            "email_cc_ids": [],
            "forum_topic_id": null,
            "problem_id": null,
            "has_incidents": false,
            "is_public": true,
            "due_at": null,
            "tags": [],
            "custom_fields": [],
            "satisfaction_rating": null,
            "sharing_agreement_ids": [],
            "followup_ids": [],
            "ticket_form_id": 1260815049769,
            "brand_id": 1260803252829,
            "allow_channelback": false,
            "allow_attachments": true
        },
        {
            "url": "https://zccrushil.zendesk.com/api/v2/tickets/3.json",
            "id": 3,
            "external_id": null,
            "via": {
                "channel": "api",
                "source": {
                    "from": {},
                    "to": {},
                    "rel": null
                }
            },
            "created_at": "2021-11-24T21:47:58Z",
            "updated_at": "2021-11-24T21:47:58Z",
            "type": null,
            "subject": "velit eiusmod reprehenderit officia cupidatat",
            "raw_subject": "velit eiusmod reprehenderit officia cupidatat",
            "description": "Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n\nAliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.",
            "priority": null,
            "status": "open",
            "recipient": null,
            "requester_id": 1267109181870,
            "submitter_id": 1267109181870,
            "assignee_id": 1267109181870,
            "organization_id": 1260918741269,
            "group_id": 4411144210843,
            "collaborator_ids": [],
            "follower_ids": [],
            "email_cc_ids": [],
            "forum_topic_id": null,
            "problem_id": null,
            "has_incidents": false,
            "is_public": true,
            "due_at": null,
            "tags": [
                "est",
                "incididunt",
                "nisi"
            ],
            "custom_fields": [],
            "satisfaction_rating": null,
            "sharing_agreement_ids": [],
            "followup_ids": [],
            "ticket_form_id": 1260815049769,
            "brand_id": 1260803252829,
            "allow_channelback": false,
            "allow_attachments": true
        },
        {
            "url": "https://zccrushil.zendesk.com/api/v2/tickets/4.json",
            "id": 4,
            "external_id": null,
            "via": {
                "channel": "api",
                "source": {
                    "from": {},
                    "to": {},
                    "rel": null
                }
            },
            "created_at": "2021-11-24T21:48:00Z",
            "updated_at": "2021-11-24T21:48:00Z",
            "type": null,
            "subject": "excepteur laborum ex occaecat Lorem",
            "raw_subject": "excepteur laborum ex occaecat Lorem",
            "description": "Exercitation amet in laborum minim. Nulla et veniam laboris dolore fugiat aliqua et sit mollit. Dolor proident nulla mollit culpa in officia pariatur officia magna eu commodo duis.\n\nAliqua reprehenderit aute qui voluptate dolor deserunt enim aute tempor ad dolor fugiat. Mollit aliquip elit aliqua eiusmod. Ex et anim non exercitation consequat elit dolore excepteur. Aliqua reprehenderit non culpa sit consequat cupidatat elit.",
            "priority": null,
            "status": "open",
            "recipient": null,
            "requester_id": 1267109181870,
            "submitter_id": 1267109181870,
            "assignee_id": 1267109181870,
            "organization_id": 1260918741269,
            "group_id": 4411144210843,
            "collaborator_ids": [],
            "follower_ids": [],
            "email_cc_ids": [],
            "forum_topic_id": null,
            "problem_id": null,
            "has_incidents": false,
            "is_public": true,
            "due_at": null,
            "tags": [
                "amet",
                "labore",
                "voluptate"
            ],
            "custom_fields": [],
            "satisfaction_rating": null,
            "sharing_agreement_ids": [],
            "followup_ids": [],
            "ticket_form_id": 1260815049769,
            "brand_id": 1260803252829,
            "allow_channelback": false,
            "allow_attachments": true
        },
        {
            "url": "https://zccrushil.zendesk.com/api/v2/tickets/5.json",
            "id": 5,
            "external_id": null,
            "via": {
                "channel": "api",
                "source": {
                    "from": {},
                    "to": {},
                    "rel": null
                }
            },
            "created_at": "2021-11-24T21:48:00Z",
            "updated_at": "2021-11-24T21:48:00Z",
            "type": null,
            "subject": "ad sunt qui aute ullamco",
            "raw_subject": "ad sunt qui aute ullamco",
            "description": "Sunt incididunt officia proident elit anim ullamco reprehenderit ut. Aliqua sint amet aliquip cillum minim magna consequat excepteur fugiat exercitation est exercitation. Adipisicing occaecat nisi aliqua exercitation.\n\nAute Lorem aute tempor sunt mollit dolor in consequat non cillum irure reprehenderit. Nulla deserunt qui aliquip officia duis incididunt et est velit nulla irure in fugiat in. Deserunt proident est in dolore culpa mollit exercitation ea anim consequat incididunt. Mollit et occaecat ullamco ut id incididunt laboris occaecat qui.",
            "priority": null,
            "status": "open",
            "recipient": null,
            "requester_id": 1267109181870,
            "submitter_id": 1267109181870,
            "assignee_id": 1267109181870,
            "organization_id": 1260918741269,
            "group_id": 4411144210843,
            "collaborator_ids": [],
            "follower_ids": [],
            "email_cc_ids": [],
            "forum_topic_id": null,
            "problem_id": null,
            "has_incidents": false,
            "is_public": true,
            "due_at": null,
            "tags": [
                "laborum",
                "mollit",
                "proident"
            ],
            "custom_fields": [],
            "satisfaction_rating": null,
            "sharing_agreement_ids": [],
            "followup_ids": [],
            "ticket_form_id": 1260815049769,
            "brand_id": 1260803252829,
            "allow_channelback": false,
            "allow_attachments": true
        }
    ];
    let response;
    beforeAll(()=>{
        response = parseTicketsListData(testInput);
    })
    test('retains the length of the original list', ()=>{
        expect(response.length).toEqual(5);
    });
    test('has required fields', ()=>{
        const keys = Object.keys(response[0]);
        const flag = keys.includes('tags') && 
            keys.includes('id') && 
            keys.includes('subject')
        expect(flag).toBe(true);
    });
})