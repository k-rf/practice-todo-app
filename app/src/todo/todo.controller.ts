import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
    UseFilters,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { DomainExceptionFilter } from "utils/filter/domain-exception.filter";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
@UseFilters(DomainExceptionFilter)
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
    findOne(@Param("id") id: string) {
        return this.todoService.findOne(+id);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.todoService.remove(+id);
    }
}
