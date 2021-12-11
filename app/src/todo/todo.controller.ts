import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Res,
    UseFilters,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { InfrastructureException } from "lib/exception/infrastructure.exception";
import { Response } from "express";
import { DomainExceptionFilter } from "lib/filter/domain-exception.filter";
import { InfrastructureExceptionFilter } from "lib/filter/infrastructure-exception.filter";
import { ParseUUIDPipe } from "utils/parse-uuid.pipe";
import { UUID } from "utils/uuid";
import { ChangeTodoLayoutsDto } from "./dto/change-todo-layouts.dto";
import { ChangeTodoStatusDto } from "./dto/change-todo-status.dto";
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

    @Put(":id/status")
    @UsePipes(new ValidationPipe({ transform: true }))
    async changeStatus(
        @Param("id", new ParseUUIDPipe()) id: UUID,
        @Body() changeTodoStatusDto: ChangeTodoStatusDto,
        @Res() res: Response,
    ) {
        const dto = ChangeTodoStatusDto.of({
            ...changeTodoStatusDto,
            id,
        });

        try {
            res.json({
                ...(await this.todoService.changeStatus(dto)),
            }).send();
        } catch (e) {
            if (e instanceof InfrastructureException) {
                // Todo: 例外処理の方法を調べる
                throw new NotFoundException();
            } else {
                throw e;
            }
        }
    }

    @Put("layouts")
    async changeLayouts(@Body() changeTodoLayoutsDto: ChangeTodoLayoutsDto) {
        await this.todoService.changeLayouts(changeTodoLayoutsDto);
    }

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", new ParseUUIDPipe()) id: UUID) {
        return this.todoService.findOne(id);
    }

    @Delete(":id")
    async remove(@Param("id", new ParseUUIDPipe()) id: UUID) {
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
