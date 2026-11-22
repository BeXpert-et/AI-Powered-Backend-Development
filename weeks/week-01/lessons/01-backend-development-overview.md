# What Backend Development Is and What Backend Developers Build

**Format:** presentation-based lesson.

## Learning objectives

Explain the role of the frontend, backend, API and database; follow a request and response; describe the restaurant analogy; distinguish frontend and backend responsibilities; and give examples of backend systems.

## Core concepts

- **Frontend:** the interface the user sees and interacts with. It gathers input, displays data and sends requests to services.
- **Backend:** code running on a server. It validates requests, applies business rules, coordinates storage or external services, and returns responses.
- **API:** an interface contract defining what operations are available, which inputs to send, and which responses to expect. Many web APIs use HTTP and JSON.
- **Database:** persistent storage and querying of application data. Not every backend request needs a database operation.

## Restaurant analogy

| Restaurant | Software equivalent |
|---|---|
| Customer and ordering experience | User and frontend |
| Waiter conveying order and result | API request/response |
| Kitchen applying recipe and work steps | Backend business logic |
| Inventory, receipts and records | Database |
| Meal presented to customer | Response displayed on frontend |

The analogy is a simplified mental model. An API is not literally a person, and a backend can use several services or databases.

## What developers build

Frontend developers typically build accessible screens, forms, interaction and feedback. Backend developers typically design APIs, business rules, data access, authentication, authorization, tests, operations and integrations. Full-stack developers work across both.

Examples: learning platforms, payment services, booking systems, admin dashboards, notifications, file uploads and AI integrations.

## Discussion

1. What happens after a student clicks **Submit assignment**?
2. Which part should check that a user owns a resource?
3. Can a backend serve a public endpoint without asking the user to log in?
4. Why is storing an order different from displaying an order?
