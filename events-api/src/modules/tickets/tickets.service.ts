import { Injectable } from "@nestjs/common";
import { CreateTicketReqDto } from "./dto/requests";
import { DatabaseService } from "../database/database.service";
import { EventsService } from "../events/events.service";

@Injectable()
export class TicketsService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly eventsService: EventsService
    ) {}

    async createTicket(dto: CreateTicketReqDto, ticketUserId: string) {
        const existingEvent = await this.eventsService.getEventById(
            dto.ticketEventId
        );

        const createdTicket = await this.databaseService.ticket.create({
            data: {
                ticketQuantity: dto.ticketQuantity,
                ticketPrice: dto.ticketPrice,
                ticketStatus: "pending",
                ticketEvent: {
                    connect: { eventId: existingEvent.eventId }
                },
                ticketUser: {
                    connect: { userId: ticketUserId }
                }
            }
        });

        return createdTicket;
    }
}