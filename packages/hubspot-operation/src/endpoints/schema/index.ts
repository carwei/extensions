import type { HubSpotSchema } from '../../types';
export default {
    associations: [
        {
            types: [
                {
                    associationCategory: "HUBSPOT_DEFINED | USER_DEFINED | INTEGRATOR_DEFINED",
                    associationTypeId: 578
                }
            ],
            to: {
                id: "string"
            }
        }
    ],
    properties: {
        activities: {
            property_a: "string",
            property_b: "string"
        },
        calls: {
            hs_timestamp: "YYYY-MM-DD H:i:s",
            hs_call_body: "The description of the call, including any notes that you want to add.",
            hs_call_callee_object_id: "The ID of the HubSpot record associated with the call.",
            hs_call_callee_object_type: "INBOUND or OUTBOUND",
            hs_call_direction: "INBOUND or OUTBOUND",
            hs_call_disposition: "Busy: 9d9162e7-6cf3-4944-bf63-4dff82258764, Connected: f240bbac-87c9-4f6e-bf70-924b57d47db7, Left live message: a4c4c377-d246-4b32-a13b-75a56a4cd0ff, Left voicemail: b2cf5968-551e-4856-9783-52b3da59a7d0, No answer: 73a0d17f-1163-4015-bdd5-ec830791da20, Wrong number: 17b47fee-58de-441e-a44c-c6300d46f273",
            hs_call_duration: "The duration of the call in milliseconds.",
            hs_call_from_number: "The phone number that the call was made from.",
            hs_call_recording_url: "The URL that stores the call recording as mp3 or wav.",
            hs_call_status: "BUSY, CALLING_CRM_USER, CANCELED, COMPLETED, CONNECTING, FAILED, IN_PROGRESS, NO_ANSWER, QUEUED or RINGING",
            hs_call_title: "The title of the call.",
            hs_call_source: "INTEGRATIONS_PLATFORM (Optional)",
            hs_call_to_number: "The phone number that received the call.",
            hubspot_owner_id: "ID of the owner",
            hs_activity_type: "The type of call.",
            hs_attachment_ids: "The IDs of the email's attachments seperated by semi-colon."
        },
        companies: {
            name: "HubSpot",
            domain: "hubspot.com",
            city: "Cambridge",
            industry: "INFORMATION_TECHNOLOGY_AND_SERVICES",
            phone: "555-555-555",
            state: "Massachusetts",
            lifecyclestage: "51439524"
        },
        contacts: {
            email: "example@hubspot.com",
            firstname: "Jane",
            lastname: "Doe",
            phone: "(555) 555-5555",
            company: "HubSpot",
            website: "hubspot.com",
            lifecyclestage: "marketingqualifiedlead"
        },
        communications: {
            hs_communication_channel_type: "WHATS_APP | LINKEDIN_MESSAGE | SMS",
            hs_communication_logged_from: "CRM",
            hs_communication_body: "The text body of the message.",
            hubspot_owner_id: "ID of the owner",
            hs_timestamp: "YYYY-MM-DD H:i:s"
        },
        deals: {
            amount: "1500.00",
            closedate: "2019-12-07T16:50:06.678Z",
            dealname: "New deal",
            pipeline: "default",
            dealstage: "contractsent",
            hubspot_owner_id: "910901"
        },
        email: {
            hs_timestamp: "YYYY-MM-DD H:i:s",
            hubspot_owner_id: "ID of the owner",
            hs_email_direction: "EMAIL, INCOMING_EMAIL, FORWARDED_EMAIL",
            hs_email_html: "The body of an email if it is sent from a CRM record.",
            hs_email_status: "BOUNCED, FAILED, SCHEDULED, SENDING, SENT",
            hs_email_subject: "The subject line of the logged email.",
            hs_email_text: "The body of the email.",
            hs_attachment_ids: "The IDs of the call's attachments seperated by semi-colon.",
            hs_email_headers: "The email's headers."
        },
        leads: {
            hs_lead_name: "Jane Doe",
            hs_lead_type: "NEW BUSINESS",
            hs_lead_label: "WARM"
        },
        meetings: {
            hs_timestamp: "YYYY-MM-DD H:i:s",
            hs_meeting_title: "The title of the meeting.",
            hubspot_owner_id: "ID of the owner",
            hs_meeting_body: "The meeting description.",
            hs_internal_meeting_notes: "The internal notes you take for your team during a meeting that are not included in the attendee meeting description.",
            hs_meeting_external_url: "The external URL for the calendar event.",
            hs_meeting_location: "Link or Where the meeting takes place.",
            hs_meeting_start_time: "YYYY-MM-DD H:i:s",
            hs_meeting_end_time: "YYYY-MM-DD H:i:s",
            hs_meeting_outcome: "scheduled, completed, rescheduled, no show, or canceled",
            hs_activity_type: "The type of meeting.",
            hs_attachment_ids: "The IDs of the call's attachments seperated by semi-colon.",
        },
        notes: {
            hs_timestamp: "YYYY-MM-DD H:i:s",
            hs_note_body: "The note's text content, limited to 65,536 characters.",
            hubspot_owner_id: "ID of the owner",
            hs_attachment_ids: "The IDs of the call's attachments seperated by semi-colon."
        },
        products: {
            name: "Implementation Service",
            price: "6000.00",
            hs_sku: "123456",
            description: "Onboarding service for data product",
            hs_cost_of_goods_sold: "600.00",
            hs_recurring_billing_period: "P12M"
        },
        tasks: {
            hs_timestamp: "YYYY-MM-DD H:i:s",
            hs_task_body: "The task notes.",
            hubspot_owner_id: "ID of the owner",
            hs_task_subject: "The title of the task.",
            hs_task_status: "COMPLETED or NOT_STARTED",
            hs_task_priority: "LOW, MEDIUM or HIGH",
            hs_task_type: "EMAIL, CALL or TODO",
            hs_task_reminders: "YYYY-MM-DD H:i:s"
        },
        tickets: {
            hs_pipeline: "0",
            hs_pipeline_stage: "1",
            hs_ticket_priority: "HIGH",
            subject: "troubleshoot report"
        },
    }
} as HubSpotSchema;