import { Controller, Get } from "@nestjs/common";
import { CommentsService } from "./comments.service";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get("/all")
  getAll() {
    return this.commentsService.getAll();
  }
}
