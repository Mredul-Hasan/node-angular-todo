import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
  // @Input() todoInput;
  @Input() todoInput: Todo;

  completed: boolean = false;
  todo: Todo;

  constructor(public todoService: TodoService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onChange() {
    console.log("changed");
    this.completed = !this.completed;
    this.completed 
    ? this.messageService.add({ severity: 'success', summary: "COMPLETED", detail: "Todo succesfully completed" })
    : '';
  }

  onCliCk(e) {
    console.log("Clicked");
    console.log(e);
  }

  toggleClass() {
    if (this.completed) {
      // return 'list-item-success';
      return { 'list-group-item-success': this.completed, 'border-primary': this.completed };

    }
  }

  deleteTodo(item) {
    this.todo = item;
    this.todoService.deleteTodo(item);
    this.messageService.add({ severity: 'error', summary: "Deleted Successfuly", detail: `Todo ${item.id} Deleted!` })
  }
  isFavorite() {
    this.todoInput.isFavorite = !this.todoInput.isFavorite;
    if (this.todoInput.isFavorite) {
      this.messageService.add({ severity: 'success', summary: "Successfu", detail: "Todo Added to Favorite" })

      this.todoService.fav.unshift(this.todoInput);

      localStorage.setItem("favorite", JSON.stringify(this.todoService.fav));

    }
    else {
      this.messageService.add({ severity: 'error', summary: "DELETED", detail: "Todo Removed from Favorite" })

      let index = this.todoService.todoList.indexOf(this.todo);
      this.todoService.fav.splice(index, 1);

      localStorage.setItem("favorite", JSON.stringify(this.todoService.fav));

    }
  }

}
