import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private webRequestService: WebRequestService) { }

  createList(title: string){
    return this.webRequestService.post("lists", {title});
  }



  getLists(){
    return this.webRequestService.get('lists'); 
  }

  getTasks(listId: string){
    console.log()
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string) {
    return this.webRequestService.post(`lists/${listId}/tasks`, {title});
  }
  
  complete(task: any) {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

  deleteList(listId: string) {
    return this.webRequestService.delete(`lists/${listId}`);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  updateList(id: string, title: string) {
    console.log(id, title)
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }
  

}
