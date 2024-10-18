import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketReqDto } from "./dto/requests";
import { AuthTokenGuard } from "src/shared/guards/auth-token.guard";
import { User } from "src/shared/decorators";
import { User as UserEntity } from "@prisma/client";

@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    @UseGuards(AuthTokenGuard)
    async createTicket(
        @Body() createTicketDto: CreateTicketReqDto,
        @User() user: UserEntity
    ) {
        const createdTicket = await this.ticketsService.createTicket(
            createTicketDto,
            user.userId
        );

        return {
            data: createdTicket
        };
    }

    @Get()
    @UseGuards(AuthTokenGuard)
    async getTickets(@User() user: UserEntity) {
        const userTickets = await this.ticketsService.getTickets(user.userId);

        return {
            data: userTickets
        };
    }
}
