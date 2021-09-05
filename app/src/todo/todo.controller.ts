import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Response } from "express";

@Controller("todo")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
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
