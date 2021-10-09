import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Res,
    UseFilters,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { InfrastructureException } from "utils/exception/infrastructure.exception";
import { DomainExceptionFilter } from "utils/filter/domain-exception.filter";
import { InfrastructureExceptionFilter } from "utils/filter/infrastructure-exception.filter";
import { UUID } from "utils/uuid";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
@UseFilters(DomainExceptionFilter)
@UseFilters(InfrastructureExceptionFilter)
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
        res.json({
            id: String(await this.todoService.create(createTodoDto)),
        }).send();
    }

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: UUID) {
        return this.todoService.findOne(id);
    }

    @Delete(":id")
    async remove(@Param("id") id: UUID) {
        try {
            await this.todoService.remove(id);
        } catch (e) {
            if (e instanceof InfrastructureException) {
                // Todo: 例外処理の方法を調べる
                throw new NotFoundException();
            } else {
                throw e;
            }
        }
    }
}
