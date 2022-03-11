import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Item } from './listitem/listitem.component';

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
  x: any = 0;
  show: boolean = true;
  processCompleted = false;
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];
  nodes1 = []
  nodes2 = [{
    name: "Cluster grouping",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 2,
    preNode: null,
    dragPosition: {
      x: 310,
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
      x: 310,
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
      x: 310,
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
      x: 310,
      y: null,
    }
  },
  ]
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  @ViewChild('native') native: ElementRef;
  @ViewChild('native1') native1: ElementRef;

  changePosition() {
    console.log("called")
    this.nodes2.forEach((item) => {
      console.log(item.dragPosition)
    })
  }

  drop1(event, index) {
    if (event.dropPoint.x < this.x && event.distance.x < 0) {
      const tog = this.nodes1.includes(index);
      if (!tog) {
        this.nodes1.push(index);
        const CI = this.nodes2.findIndex(item => item === index)
        this.nodes2.splice(CI, 1);
      }
    }
    if (event.dropPoint.x > this.x && event.distance.x > 0) {
      const tog = this.nodes2.includes(index);
      if (!tog) {
        this.nodes2.push(index);
        const CI = this.nodes1.findIndex(item => item === index)
        this.nodes1.splice(CI, 1);
      }
    }
    if (this.nodes1.length !== 0) {
      if (this.nodes1.length == 2) {

        this.nodes1[0].preNode = null;
        this.nodes1[0].nextNode = 2;

        this.nodes1[1].preNode = 1;
        this.nodes1[1].nextNode = null;
      }
      else {
        this.nodes1[0].preNode = null;
        this.nodes1[this.nodes1.length - 1].nextNode = null;
        for (let index = 0; index < this.nodes1.length; index++) {
          if (index === 0) {
            this.nodes1[index].nextNode = 2;
          }
          else if (index === this.nodes1.length - 1) {
            if (index === 1) {
              this.nodes1[index].preNode = 1;
              this.nodes1[index].nextNode = null;
            } else {
              this.nodes1[index].nextNode = null;
              this.nodes1[index].preNode = this.nodes1.length - 1;
            }
          }
          else {
            this.nodes1[index].preNode = this.nodes1[index - 1].nextNode - 1;
            this.nodes1[index].nextNode = this.nodes1[index - 1].nextNode + 1;
          }
        }
      }
    }
    if (this.nodes2.length !== 0) {
      if (this.nodes2.length == 2) {
        this.nodes2[0].preNode = null;
        this.nodes2[0].nextNode = 2;
        this.nodes2[1].preNode = 1;
        this.nodes2[1].nextNode = null;
      }
      else {
        this.nodes2[0].preNode = null;
        this.nodes2[this.nodes2.length - 1].nextNode = null;
        for (let index = 0; index < this.nodes2.length; index++) {
          if (index === 0) {
            this.nodes2[index].nextNode = 2;
          }
          else if (index === this.nodes2.length - 1) {
            if (index === 1) {
              this.nodes2[index].preNode = 1;
              this.nodes2[index].nextNode = null;
            } else {
              this.nodes2[index].nextNode = null;
              this.nodes2[index].preNode = this.nodes2.length - 1;
            }
          }
          else {
            this.nodes2[index].preNode = this.nodes2[index - 1].nextNode - 1;
            this.nodes2[index].nextNode = this.nodes2[index - 1].nextNode + 1;
          }
        }
      }
    }
  }
  Sort() {
    const toArray = Object.values(this.nodes2);
    const sortedByX = [...toArray].sort((a, b) => a.dragPosition.x - b.dragPosition.x)
  }
  delete(currentNode) {
    console.log(currentNode);
    this.nodes1.push(currentNode);
    const index = this.nodes2.findIndex(item => item === currentNode)
    this.nodes2.splice(index, 1)
  }
  ref() {
    location.reload();
  }
  start(currentObject) {
    this.onNext = false;
    currentObject.isRunning = true;
    setTimeout(() => {
      currentObject.isRunning = false;
      currentObject.isCompleted = true;
      this.onNext = true;
      if (currentObject.nextNode && currentObject.nextNode != null) {
        const index = this.nodes2.findIndex(item => item == currentObject)
        this.start(this.nodes2[index + 1])
      } else {
        this.processCompleted = true
      }
    }, 3000);
  }
  ngOnInit(): void { }
  ngAfterViewInit() {
    if (this.native !== undefined) {
      const el = this.native.nativeElement;
      this.x = el.getBoundingClientRect(this.native).right;
      console.log(this.x);
    }
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
