import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Item } from './listitem/listitem.component';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { not } from '@angular/compiler/src/output/output_ast';

class item {
  name: String;
  desc: String;
  isRunning: boolean;
  isCompleted: boolean;
  hasError: boolean;
  nextNode: number;
  preNode: any;
}

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})

export class DragdropComponent implements OnInit {
  public parentItem: Item;
  onNext = false;
  processCompleted = false;
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];

  nodes = [{
    name: "Cluster grouping",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 2,
    preNode: null,
  },
  {
    name: "Node Boundary ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 3,
    preNode: 1,
  },
  {
    name: "Node Placements",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 4,
    preNode: 2,
  },
  {
    name: "Cluster Corrections",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: null,
    preNode: 3,
  },
  ]

  ref(){
    location.reload();
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.nodes.forEach((node) => {
      const index = this.nodes.findIndex(item => item == node)
      if (index === 0) {
        node.preNode = null;
        node.nextNode = 1;
      }
      else if (index === this.nodes.length - 1) {
        node.preNode = this.nodes.length - 1;
        node.nextNode = null;
      }
      else if (index > 0 && index < this.nodes.length - 1) {
        node.preNode = index - 1;
        node.nextNode = index + 1;
      }

    })
    console.log(this.nodes);

  }

  start(currentObject) {
    this.onNext = false;
    //const element = this.nodes[0];
    currentObject.isRunning = true;
    setTimeout(() => {
      currentObject.isRunning = false;
      currentObject.isCompleted = true;
      this.onNext = true;

      if (currentObject.nextNode && currentObject.nextNode != null) {
        const index = this.nodes.findIndex(item => item == currentObject)
        this.start(this.nodes[index + 1])
      } else {
        this.processCompleted = true
      }
    }, 3000);
  }
  ngOnInit(): void {

  }


}
//   printData() {
//     this.nodes.map((item) => {
//       console.log(item.name);
//     })
//   }
//   drop(event: CdkDragDrop<string[]>) {
//     moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
//   }






//   public get connectedDropListsIds(): string[] {
//     // We reverse ids here to respect items nesting hierarchy
//     return this.getIdsRecursive(this.parentItem).reverse();
//   }

//   constructor() {
//     this.parentItem = new Item({ name: 'parent-item' });
//   }

//   public ngOnInit() {
//     this.parentItem.children.push(new Item({
//       name: 'Parent 1',
//       children: [
//         new Item({ name: 'Child 1' }),
//         new Item({ name: 'Child 2' }),
//         new Item({ name: 'Child 3' })
//       ]
//     }));
//     this.parentItem.children.push(new Item({
//       name: 'Parent 2',
//       children: [
//         new Item({ name: 'P Child 1' }),
//         new Item({ name: 'P Child 2' }),
//         new Item({
//           name: 'subItem6', children: [
//             new Item({ name: 'P Child 2-1' })
//           ]
//         })
//       ]
//     }));
//     this.parentItem.children.push(new Item({ name: 'Parent 3' }));
//   }

//   public onDragDrop(event: CdkDragDrop<Item>) {
//     event.container.element.nativeElement.classList.remove('active');
//     if (this.canBeDropped(event)) {
//       const movingItem: Item = event.item.data;
//       event.container.data.children.push(movingItem);
//       event.previousContainer.data.children = event.previousContainer.data.children.filter((child) => child.uId !== movingItem.uId);
//     } else {
//       moveItemInArray(
//         event.container.data.children,
//         event.previousIndex,
//         event.currentIndex
//       );
//     }
//   }

//   private getIdsRecursive(item: Item): string[] {
//     let ids = [item.uId];
//     item.children.forEach((childItem) => { ids = ids.concat(this.getIdsRecursive(childItem)) });
//     return ids;
//   }

//   private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
//     const movingItem: Item = event.item.data;
//     return event.previousContainer.id !== event.container.id
//       && this.isNotSelfDrop(event)
//       && !this.hasChild(movingItem, event.container.data);
//   }

//   private isNotSelfDrop(event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>): boolean {
//     return event.container.data.uId !== event.item.data.uId;
//   }
//   private hasChild(parentItem: Item, childItem: Item): boolean {
//     const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
//     return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
//   }

// }
