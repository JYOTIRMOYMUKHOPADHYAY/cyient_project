import { Component, OnInit } from '@angular/core';
import { Item } from './listitem/listitem.component';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  tempX = 0;
  tempY = 0;
  processCompleted = false;
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];

  nodes1 = [{
    name: "Cluster grouping",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 2,
    preNode: null,
    dragPosition: {
      x: null,
      y: null,
    }
  } ]
  nodes2 = [{
    name: "Cluster grouping",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 2,
    preNode: null,
    dragPosition: {
      x: null,
      y: null,
    }
  },
  {
    name: "Node Boundary ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 3,
    preNode: 1,
    dragPosition: {
      x: null,
      y: null,
    }
  },
  {
    name: "Node Placements",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 4,
    preNode: 2,
    dragPosition: {
      x: null,
      y: null,
    }
  },
  {
    name: "Cluster Corrections",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: null,
    preNode: 3,
    dragPosition: {
      x: null,
      y: null,
    }

  },
  ]

  changePosition() {
    console.log("called")
    // for (let index = 0; index < this.nodes2.length; index++) {
    //   this.nodes2[index].dragPosition;

    // }
    this.nodes2.forEach((item) => {
      console.log(item.dragPosition)
    })
  }
  onDrag(event: CdkDragEnd) {

    const tempName = event.source.element.nativeElement.innerHTML;
    const currentObject = this.nodes1.find(item => item.name == tempName);
    this.nodes2.push(currentObject);
    const index = this.nodes1.findIndex(item => item.name == tempName)
    this.nodes1.splice(index, 1)
  }
  onDragStart(event) {
    console.log(`starting`, event);
    // Hide dragged element

  }

  onDragEnd(event: DragEvent) {
    console.log('drag end', event);
    // Show dragged element again

  }
  drop1(event, index) {
    console.log(event.dropPoint)
    index.dragPosition.x = event.dropPoint.x;
    index.dragPosition.y = event.dropPoint.y;
    console.log(index)
  }
  Sort() {
    const toArray = Object.values(this.nodes2);
    const sortedByX = [...toArray].sort((a, b) => a.dragPosition.x - b.dragPosition.x)
    console.log(sortedByX)
  }
  delete(currentNode) {
    console.log(currentNode);
    // const a= this.nodes1.length;
    this.nodes1.push(currentNode);
    // const cnv = currentNode.nextNode;
    const index = this.nodes2.findIndex(item => item === currentNode)
    this.nodes2.splice(index, 1)

  }
  // dropped(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }
  ref() {
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
        event.currentIndex);
    }
  }

  start(currentObject) {
    this.onNext = false;
    //const element = this.nodes1[0];
    currentObject.isRunning = true;
    setTimeout(() => {
      currentObject.isRunning = false;
      currentObject.isCompleted = true;
      this.onNext = true;
      if (currentObject.nextNode && currentObject.nextNode != null) {
        const index = this.nodes1.findIndex(item => item == currentObject)
        this.start(this.nodes1[index + 1])
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
