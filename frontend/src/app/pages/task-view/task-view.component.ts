import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit{
  lists: any;
  tasks: any;

  selectedListId: any;
  
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router){ 
  }

   ngOnInit(){
    // const lists =  this.taskService.getLists();
    // lists.subscribe((_lists: any) => {
    //   console.log(_lists);
    //   this.lists = _lists;

    //   _lists.forEach((list: any) => {
    //     this.taskService.getTasks(list._id).subscribe(_tasks => {
    //       console.log(this.tasks)
    //       this.tasks = this.tasks ? [...this.tasks, _tasks] : _tasks
    //     })
    //   });
    // })
    // this.taskService.getLists().subscribe((lists: any) =>{
    //   this.lists = lists;
    // console.log(lists)

    // this.tasks = lists.forEach((list: any) => {
    //          this.taskService.getTasks(list._id).subscribe((tasks:any) => {
    //         return tasks
    //       })
    // } )
    // })

    // console.log(this.lists)

    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
      
    })

  }

  onTaskClick(task: any){
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val: { _id: string; }) => val._id !== id);
      console.log(res);
    })
  }

}
